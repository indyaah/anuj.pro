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
        webDriver.get("https://poptip.com/embed/v2/?pollID=53471fff0b038134ef000dbf&displayConfig=01011110&featureConfig=1111&orientation=h&color=dark");
        webDriver.findElement(By.xpath(".//*[@id='pt-w-bars']/div[2]")).click();
        webDriver.findElement(By.xpath(".//*[@id='pt-w-wrapper']/div[4]/div/a[2]")).click();

        Set<String> windowId = webDriver.getWindowHandles();
        Iterator<String> itererator = windowId.iterator();

        String mainWinID = itererator.next();
        String newAdwinID = itererator.next();
        webDriver.switchTo().window(newAdwinID);
        webDriver.findElement(By.id("status")).sendKeys((i++).toString());
        webDriver.findElement(By.name("session[username_or_email]")).sendKeys("USERNAME");
        webDriver.findElement(By.name("session[password]")).sendKeys("PASSWORD");
        webDriver.findElement(By.xpath(".//*[@id='update-form']/div[4]/fieldset[2]/input[2]")).click();
        webDriver.close();
        webDriver.switchTo().window(mainWinID).close();
        webDriver.quit();
    }
}
```


[1]: http://patelanuj.com/post/83461827453/why-i-dont-take-times-poll-seriously