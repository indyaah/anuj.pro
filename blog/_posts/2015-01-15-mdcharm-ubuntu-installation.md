---
layout: post
title: Installing mdcharm in latest Ubuntu (GNOME flavor, rolling release).

tags:
  - Ubuntu
  - MdCharm
  - libhunspell.so
twitter: CounterBug
github: indyaah
---

Steps :

1. Get the installer file from offical release on [Github](https://github.com/zhangshine/MdCharm/releases).

2. Install gdebi if you are not using it yet. ```sh sudo apt-get install gdebi```

3. ```sh sudo gdebi mdcharm_X.Y_amd64.deb``

4. After the installation try starting the meld from commandline. (Starting from commandline to see if any errors are reported, most likely there is one in particular.)

5. If you see following error ***mdcharm: error while loading shared libraries: libhunspell.so: cannot open shared object file: No such file or directory***

    * Search for libhunspel pacakge in apt. ```sh sudo apt-get search libhunspel```
    * Install the dev version of package ```sudo apt-get install libhunspell-dev ``` and very the link ```sh ll /usr/lib/x86_64-linux-gnu/libhunspell.so ```
    * Try again.

 If you see any more issues please drop a mail, would love to help out.