//
//  TXPaySDK.m
//  TXPaySDK
//
//  Created by 张昭 on 16/2/22.
//  Copyright © 2016年 张昭. All rights reserved.
//

#import "TXPaySDK.h"
#import "TXRSAHandler.h"
#import <CommonCrypto/CommonDigest.h>
#import <objc/message.h>
#import <objc/runtime.h>



@interface TXPaySDK ()

@property (nonatomic, assign) SignType sign_type;
@property (nonatomic, copy) NSString *md5_key;
@property (nonatomic, copy) NSString *private_key;
@property (nonatomic, copy) NSString *txPay_public_key;
@property (nonatomic, copy) NSString *url;
@property (nonatomic, copy) NSString *signValue;

@property (nonatomic, copy) NSString *requireResult;// js

@end

@implementation TXPaySDK

// js 交互
RCT_EXPORT_MODULE();

// 配置请求地址
RCT_EXPORT_METHOD(ocInitBaseURL:(NSString *)url) {
  [self initURL:url];
}

// 配置MD5key
RCT_EXPORT_METHOD(ocInitMD5Key:(NSString *)md5_key) {
  [self initMD5:md5_key];
}

// 配置RSA
RCT_EXPORT_METHOD(ocInitRSAWithPrivateKey:(NSString *)private_key withTXPayKey:(NSString *)TXPay_public_key) {
  [self initRSAWithPrivateKey:private_key withTXPayKey:TXPay_public_key];
}

// 提交RSA加密的数据请求
RCT_EXPORT_METHOD(ocSubmitRsaRequireParams:(NSDictionary *)params) {
  [self submitParam:params withType:RSA];
}

// 提交MD5加密的数据请求
RCT_EXPORT_METHOD(ocSubmitMd5RequireParams:(NSDictionary *)params) {
  [self submitParam:params withType:MD5];
}

// 请求结果回调
RCT_EXPORT_METHOD(ocRequireResult:(RCTResponseSenderBlock)callback) {
  if (!self.requireResult) {
    self.requireResult = @"error";
  }
  callback(@[[NSNull null], self.requireResult]);
}

- (void)submitParam:(NSDictionary *)order withType:(SignType)type {
  self.sign_type = type;
  
  // 验证是否调用过 注册URL 和 注册签名方式 这两个方法
  if (self.url.length == 0) {
    NSLog(@"URL must not be nil");
    return;
  }
  if ((self.private_key.length == 0 || self.txPay_public_key.length == 0) && self.md5_key.length == 0) {
    NSLog(@"signType must be MD5 or RSA");
    return;
  }
  
  // 对参数处理，最终形成用于请求的URL
  NSString *dealStr = [self handleResult:order isEncode:NO];
  [self creatSignedOrderWith:dealStr];
  
  // get
  NSString *getURL = [self handleResult:order isEncode:YES];
  NSLog(@"GET地址：%@", getURL);
  
  self.requireResult = getURL;
  
}


+ (instancetype)sharedInstance {
    static TXPaySDK *manager = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        manager = [[TXPaySDK alloc] init];
    });
    return manager;
}

// 注册URL
- (void)initURL:(NSString *)txPayUrlString {
    if (txPayUrlString.length && txPayUrlString) {
        self.url = txPayUrlString;
    } else {
        return;
    }
}

// 注册MD5签名
- (void)initMD5:(NSString *)MD5Key {
    if (MD5Key && MD5Key.length) {
        self.md5_key = MD5Key;
    } else {
        return;
    }

}

// 注册RSA签名
- (void)initRSAWithPrivateKey:(NSString *)RSA_private_key withTXPayKey:(NSString *)TXPay_public_key {
    if (RSA_private_key && RSA_private_key.length) {
        [[TXRSAHandler sharedInstance] importKeyWithType:KeyTypePrivate andkeyString:RSA_private_key];
        self.private_key = RSA_private_key;
    } else {
        return;
    }
    if (TXPay_public_key && TXPay_public_key.length) {
        [[TXRSAHandler sharedInstance] importKeyWithType:KeyTypePublic andkeyString:TXPay_public_key];
        self.txPay_public_key = TXPay_public_key;
    } else {
        return;
    }

}

// 签名并拼接成最终的URL
- (void)creatSignedOrderWith:(NSString *)orderStr {
    
    if (self.sign_type == MD5) {
        NSString *keyStr = [NSString stringWithFormat:@"%@%@", orderStr, self.md5_key];
        self.signValue = [self getMd5_32Bit_String:keyStr];
    }
    
    if (self.sign_type == RSA) {
        self.signValue = [[TXRSAHandler sharedInstance] signString:orderStr];
    }
}



// 发送请求
- (void)requestSubmit:(NSDictionary *)order withSignType:(SignType)type withResult:(RequestResult)result {
    
    self.sign_type = type;
    
    // 验证是否调用过 注册URL 和 注册签名方式 这两个方法
    if (self.url.length == 0) {
        NSLog(@"URL must not be nil");
        return;
    }
    if ((self.private_key.length == 0 || self.txPay_public_key.length == 0) && self.md5_key.length == 0) {
        NSLog(@"signType must be MD5 or RSA");
        return;
    }
    
    // 对参数处理，最终形成用于请求的URL
    NSString *dealStr = [self handleResult:order isEncode:NO];
    [self creatSignedOrderWith:dealStr];
    
    // get
    NSString *getURL = [self handleResult:order isEncode:YES];
    NSLog(@"GET地址：%@", getURL);
    
    // post
    NSString *postURL = [[getURL componentsSeparatedByString:@"?"] firstObject];
    NSString *postBodyStr = [[getURL componentsSeparatedByString:@"?"] lastObject];
    
    // GET: getURL   POST: postURL
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:postURL] cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:6.0];
    
    // post
    [request setHTTPMethod:@"POST"];
    [request setHTTPBody:[postBodyStr dataUsingEncoding:NSUTF8StringEncoding]];
    
    NSURLSessionConfiguration *sessionConfig = [NSURLSessionConfiguration defaultSessionConfiguration];
    NSURLSession *session = [NSURLSession sessionWithConfiguration:sessionConfig];
    NSURLSessionDataTask *postTask = [session dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        if (error) {
            NSLog(@"网络请求错误：%@", error);
            NSThread *thead = [NSThread currentThread];
            if (thead.isMainThread) {
                
            } else {
                dispatch_async(dispatch_get_main_queue(), ^{
                    [[NSNotificationCenter defaultCenter] postNotificationName:@"network_error" object:nil];
                });
            }
//            result(@{@"error": error});
            return;
        }
       
        id resu = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableContainers error:nil];
        if (resu != nil) {
            
            NSThread *thead = [NSThread currentThread];
            if (thead.isMainThread) {
                result(resu);
            } else {
                dispatch_async(dispatch_get_main_queue(), ^{
                    result(resu);
                });
            }
        }
    }];
    [postTask resume];
}

// 对请求结果验证签名
- (BOOL)checkSign:(NSDictionary *)resultDictionary withSignType:(SignType)type {
    
    self.sign_type = type;
    NSString *result = [self handleResult:resultDictionary isEncode:NO].uppercaseString;
    NSString *signValue = [resultDictionary objectForKey:@"sign"];
    
    BOOL isMatch = false;
    if (self.sign_type == RSA) {
        isMatch = [[TXRSAHandler sharedInstance] verifyString:result withSign:signValue];
    }
    if (self.sign_type == MD5) {
        if ([signValue compare:[self getMd5_32Bit_String:[NSString stringWithFormat:@"%@%@", result, self.md5_key]].uppercaseString] == 0) {
            isMatch = 1;
        } else {
            isMatch = 0;
        }
    }
    return isMatch;
}

// 将字典 去空值，排序，拼接
- (NSString *)handleResult:(NSDictionary *)resultDictionary isEncode:(BOOL)encode {
    
    NSMutableDictionary *muDic = [NSMutableDictionary dictionaryWithDictionary:resultDictionary];
    
    for (int i = 0; i < muDic.allKeys.count - 1; i++) {
        NSString *value = [muDic objectForKey:muDic.allKeys[i]];
        if ([value  isEqual: @""]) {
            [muDic removeObjectForKey:muDic.allKeys[i]];
        }
    }
    
    NSMutableArray *array = [NSMutableArray array];
    array = [muDic allKeys].mutableCopy;
    if ([resultDictionary objectForKey:@"sign"]) {
        [array removeObject:@"sign"];
    }
    
    for (int i = 0; i < array.count - 1; i++) {
        for (int j = 0; j < array.count - 1 - i; j++) {
            if ([array[j] compare:array[j + 1]] == 1) {
                NSString *temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    NSMutableString *result = [NSMutableString string];
    if (encode) {
        for (int i = 0; i < array.count; i++) {
            [result appendFormat:@"%@=%@&", array[i], [self formatURLwithText:[muDic objectForKey:array[i]]]];
        }
        [result deleteCharactersInRange:NSMakeRange(result.length - 1, 1)];
        return [NSString stringWithFormat:@"%@%@&sign=%@", self.url, result, [self formatURLwithText:self.signValue]];;
    } else {
        for (int i = 0; i < array.count; i++) {
            [result appendFormat:@"%@=%@&", array[i], [muDic objectForKey:array[i]]];
        }
        [result deleteCharactersInRange:NSMakeRange(result.length - 1, 1)];

        return result;
    }
}

// 32位MD5签名
- (NSString *)getMd5_32Bit_String:(NSString *)srcString {
    const char *cStr = [srcString UTF8String];
    unsigned char digest[CC_MD5_DIGEST_LENGTH];
    CC_MD5( cStr, strlen(cStr), digest );
    NSMutableString *result = [NSMutableString stringWithCapacity:CC_MD5_DIGEST_LENGTH * 2];
    for(int i = 0; i < CC_MD5_DIGEST_LENGTH; i++)
        [result appendFormat:@"%02x", digest[i]];
    
    return result;
}

// 对URL进行转义
- (NSString *)formatURLwithText:(NSString *)text {
    return (NSString *)CFBridgingRelease(CFURLCreateStringByAddingPercentEscapes(NULL, (CFStringRef)text, NULL, (CFStringRef)@"!*’();:@&=+$/?,%#[]", kCFStringEncodingUTF8));
}



@end

