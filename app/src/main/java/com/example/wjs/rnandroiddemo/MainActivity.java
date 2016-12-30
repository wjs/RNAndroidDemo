package com.example.wjs.rnandroiddemo;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void openHelloworldPage(View view) {
        Intent intent = new Intent(this, HelloworldActivity.class);
        startActivity(intent);
    }

    public void openDemoTwoPage(View view) {
        Intent intent = new Intent(this, DemoTwo.class);
        startActivity(intent);
    }

    public void openCNodeWebView(View view) {

    }

    public void openCNodeRN(View view) {
        Intent intent = new Intent(this, CNodeRN.class);
        startActivity(intent);
    }
}
