---
layout: post
title: The laughable TIME-Proptip person of the year online poll.
---

For the context of this code please refer to : [Why I don't take TIMES poll seriously?] [1]

Also, please *DO NOT MISUSE THE CODE FOR ONLINE VOTING,* this code snippet is posted to show the poll conducting organizations how wrong they are.

``` java
package com.time.protip.poll.main;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

import java.util.Iterator;
import java.util.Set;

public class TimeProtipPollVoter {

    public static void main(String args[]){
        WebDriver webDriver = new FirefoxDriver();
        webDriver.get("BLAH");
        webDriver.findElement(By.xpath("BLAH")).click();
        webDriver.findElement(By.xpath("BLAH")).click();
        webDriver.findElement(By.id("status")).sendKeys((i++).toString());
        webDriver.findElement(By.name("session[username_or_email]")).sendKeys("USERNAME");
        webDriver.findElement(By.name("session[password]")).sendKeys("PASSWORD");
        webDriver.findElement(By.xpath(".//*[@id='update-form']/div[4]/fieldset[2]/input[2]")).click();
        webDriver.close();
        webDriver.quit();
    }
}
```

**UPDATE**
=========
Turns out the results were calculated after offsetting the spams, but still to me the poll was questionable.

[1]: http://patelanuj.com/post/83461827453/why-i-dont-take-times-poll-seriously