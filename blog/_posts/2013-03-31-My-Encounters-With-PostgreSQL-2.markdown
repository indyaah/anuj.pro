---
layout: post
title: My Encounters with PostgreSQL (Part 2)
---

1. Replication
===============

Any production database needs to be backed up properly with a DR plan in mind.
You wouldn't want to lose all your data just because of silly Head-Crash or [many more].

PostgreSQL offers a variety of options for replication/backup [availble][2], and based on data & response time sensitivity of our database we can refer to the table in the link and decide the strategy.

My Application required **NO** data loss once data reaches the server and **MINIMAL** delay in response times to assure smartest, full-proof and reliable Decision Making.

My choice, quite obviously WAL based ***Streaming Replication***.  
Although it was Async earlier it didnt affect the performance **MUCH** (lead/lag between master/slave) if both the machines were on different network and bandwidth capabilities.

With 9.2 giving option for Synchronus Streaming, the corner cases can be covered as well.

And then, I was caught by a *NOT READING MANUALS THOROUGHLY BEFORE TRYING* blunder.
When we are testing/benchmarking something, we usually end up mocking the scenarios (in OS case) by VirtualBox or some identical Development Boxes at office.

And that's where I got caught, basically in Streaming Replcation, the databases are sync-ed at file system level (to sum up). And when this is the case it's quite obvious that we are expected to have same OS on both the boxes otherwise File System,etc. OS level functionality will defer.

And I was trying to sync my CentOS 6.4 64 Bit Production Box with Ubuntu 32 Bit Backup Box.

**SNAP..!!! Count Off 2 Days From Productive Days List**

  [2]:http://www.postgresql.org/docs/9.0/static/different-replication-solutions.html
  [many more]: http://www.adrc.net/services/database-recovery/corruption.htm
