---
layout: post
title: My Encounters with PostgreSQL (Part 1)
---

> From Dolphin to the Elephant

That was the the first thought that came to my mind when I first started working with PostgreSQL coming from MySQL usage during college time.

There was little to no exposure to any kind of DB system at my little stint at TechMahindra. Obviously you don't expect Black Box Testers to even get to know DB design, do you.??

First up it was a pleasant surprise, reason being coming to PostgreSQL, an <a title="ORDBMS" href="http://en.wikipedia.org/wiki/Object-relational_database" target="_blank">ORDBMS</a> (Object Relational Database Management System) from MySQL, a <a title="RDBMS" href="http://en.wikipedia.org/wiki/Relational_database_management_system" target="_blank">RDBMS</a> (Relational Database Management System).

Difference is <strong>OBJECT. </strong>ORDBMS is simply an extension of RDBMS, all it tries is to bridge Object Oriented Paradigm with RDBMS. And it lies between OODBMS (Object Oriented Database Management System) and RDBMS. Basically ORDBMS puts an object oriented front end on a RDBMS. When your application talks to an ORDBMS, it acts as if the data are stored as objects. ORDBMS takes care of converting the objects in to data tables with rows and columns. And also provides a way to manipulate the data same as RDBMS. When data is retrieved, it will generate an object created from data table.

User/Application is transparent from the complexities, so the programmer doesn't have to worry about writing the code to switch between formats.Applications using RDBMS need do the extra work for maintaining complex data whereas ORDBMS supports it naturally.

Facts for PostgreSQL* :

<ul>
<li>PostgreSQL is a much more mature product. (<a href="http://stackoverflow.com/a/27440/876142">link</a>)</li>
<li>Strict ACID adherence. (<a href="http://www.teknico.net/devel/myvspg/index.en.html">Link</a>)</li>
<li>Real OpenSource (BSD license) (<a href="http://www.postgresql.org/about/advantages/">Link</a>)</li>
<li>Interfaces for JDBC, ODBC, Perl, Python, Ruby, C, C++, PHP, Lisp, Scheme, and Qt.</li>
<li>A great release cycle, since I started working with it, I have seen 3 Major Stable releases, which in my point of view is a great rate of development.</li>
</ul>

* Please Note : It&#8217;s been a while I worked with any other Databases than PostgreSQL in Production environment, of course I do use MySQL for most of the support applications which require it. i.e. CRM, WordPress, Trac, Bugzilla, etc.


But I dont do major Design/Query/Performance Tuning for it, so the views are tended to be biased. But who cares right.??
You don't need reasons to love something, you just love it. 

<strong>UPDATE 1 : </strong>Nice thorough comparison between MySQL &amp; PostgreSQL. (<a href="http://www.wikivs.com/wiki/MySQL_vs_PostgreSQL">Link</a>)


<strong>UPDATE 2 : </strong>Comparison Between SQL Server &amp; PostgreSQL (<a href="http://facility9.com/2011/12/ten-reasons-postgresql-is-better-than-sql-server/">Link</a>)