---
layout: post
title: spring-data-jpa 'repository:repository' to a(n) type definition exception.
---

(More like a note to self for future.)

If you ever run into something like this while developing with Spring, Hibernate, JPA and Spring-Data-JPA stack,

```java
nested exception is org.xml.sax.SAXParseException; systemId: http://www.springframework.org/schema/data/jpa/spring-jpa.xsd; lineNumber: 18; columnNumber: 48; src-resolve: Cannot resolve the name 'repository:repository' to a(n) 'type definition' component.
at org.springframework.beans.factory.parsing.FailFastProblemReporter.error(FailFastProblemReporter.java:68)
at org.springframework.beans.factory.parsing.ReaderContext.error(ReaderContext.java:85)
at org.springframework.beans.factory.parsing.ReaderContext.error(ReaderContext.java:76)
```

Double check your spring-data-jpa and spring-data-jpa-commons version, most of the times it can be solved by upgrading to latest available release.