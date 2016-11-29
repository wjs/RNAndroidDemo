package com.example.wjs.rnandroiddemo;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;

public class CNodeDetail extends ReactActivity {

    @Override
    protected String getMainComponentName() {
        return "CNodeDetail";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Nullable
            @Override
            protected Bundle getLaunchOptions() {
                Intent intent = getIntent();
                Bundle initialProps = new Bundle();
                initialProps.putString("initialProps", intent.getStringExtra("params"));
                return initialProps;
            }
        };
    }
}
