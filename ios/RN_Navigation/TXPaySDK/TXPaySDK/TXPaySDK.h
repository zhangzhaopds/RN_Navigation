//
//  TXPaySDK.h
//  TXPaySDK
//
//  Created by 张昭 on 16/2/22.
//  Copyright © 2016年 张昭. All rights reserved.
//

#import <Foundation/Foundation.h>

// js 交互
#import "RCTBridgeModule.h"


typedef void(^RequestResult)(NSDictionary *result);

typedef enum : NSUInteger {
    MD5,            // MD5签名
    RSA,            // RSA签名
} SignType;

@interface TXPaySDK : NSObject <RCTBridgeModule>


/**
 *  SDK单例
 *
 *  @return 单例
 */
+ (instancetype)sharedInstance;

/**
 *  配置同兴支付的接口
 *
 *  @param txPayUrlString 同兴支付的接口
 */
- (void)initURL:(NSString *)txPayUrlString;


/**
 *  配置MD5签名(与RSA签名，两者任选其一)
 *
 *  @param MD5Key MD5签名的密钥
 */
- (void)initMD5:(NSString *)MD5Key;

/**
 *  配置RSA签名(与MD5签名，两者任选其一)
 *
 *  @param RSA_private_key  商户自己拥有的RSA私钥字符串
 *  @param TXPay_public_key 同兴支付提供的RSA公钥字符串
 */
- (void)initRSAWithPrivateKey:(NSString *)RSA_private_key withTXPayKey:(NSString *)TXPay_public_key;

/**
 *  提交请求
 *
 *  @param order  请求参数
 *  @param type   签名加密类型
 *  @param result 请求结果(也是验证签名的参数)
 */
- (void)requestSubmit:(NSDictionary *)order withSignType:(SignType)type withResult:(RequestResult)result;


/**
 *  验证签名
 *
 *  @param resultDictionary 验证签名的参数
 *  @param type             签名类型
 *
 *  @return 验证结果：1/YES 成功， 0/NO 失败
 */
- (BOOL)checkSign:(NSDictionary *)resultDictionary withSignType:(SignType)type;



@end
