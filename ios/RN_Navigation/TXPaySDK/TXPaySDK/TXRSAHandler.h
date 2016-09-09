//
//  TXRSAHandler.h
//  TXPaySDK
//
//  Created by 张昭 on 16/2/18.
//  Copyright © 2016年 张昭. All rights reserved.
//

#import <Foundation/Foundation.h>

// js 交互
#import "RCTBridgeModule.h"


typedef enum {
    KeyTypePublic = 0,
    KeyTypePrivate
}KeyType;

@interface TXRSAHandler : NSObject <RCTBridgeModule>

+ (instancetype)sharedInstance;

- (BOOL)importKeyWithType:(KeyType)type andPath:(NSString*)path;
- (BOOL)importKeyWithType:(KeyType)type andkeyString:(NSString *)keyString;

//验证签名 Sha1 + RSA
- (BOOL)verifyString:(NSString *)string withSign:(NSString *)signString;
//验证签名 md5 + RSA
- (BOOL)verifyMD5String:(NSString *)string withSign:(NSString *)signString;

- (NSString *)signString:(NSString *)string;

- (NSString *)signMD5String:(NSString *)string;

- (NSString *)encryptWithPublicKey:(NSString*)content;

- (NSString *)decryptWithPrivatecKey:(NSString*)content;

//// 对 URL 里面的加号转义
- (NSString *)formatURLwithText:(NSString *)text;


@end
