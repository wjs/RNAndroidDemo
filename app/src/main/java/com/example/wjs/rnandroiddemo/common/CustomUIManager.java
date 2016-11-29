package com.example.wjs.rnandroiddemo.common;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CustomUIManager extends ReactContextBaseJavaModule {

    public CustomUIManager(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "CustomUIManager";
    }

    @ReactMethod
    public void openView(String targetActivityName, String params) {
        try {
            Activity currentActivity = getCurrentActivity();
            if (null != currentActivity) {
                Class targetActivity = Class.forName("com.example.wjs.rnandroiddemo." + targetActivityName);
                Intent intent = new Intent(currentActivity, targetActivity);
                intent.putExtra("params", params);
                currentActivity.startActivity(intent);
            }
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException(
                    "Could not open the activity : " + e.getMessage());
        }
    }
}
