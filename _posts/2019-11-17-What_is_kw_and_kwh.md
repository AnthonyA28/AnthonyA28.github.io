---
title: Thre dreaded kwh
layout: article_post
section: article
excerpt: Many people simply dont understand difference between kilowatt and kiowatt hour. Lets quickly clear it up. 
tags:
- requiresCompilation
---



## The Dreaded kwh

In one of my classes, I noticed that the professor had some confusion over kilowatt (kw) and kilowatt hours (kwh). Even at my job where we do utility bill consulting,  few people really understand what these terms actually mean. There is so much confusion surrounding these that I thought it is worth a brief review on what they actually represent. 

This is a simple mathematical analysis that reduces the terms to simpler units. Understanding how to work with units and their  conversions is incredibly simple and useful. I'm a stickler for writing out units when doing any type math as it will prevent many mistakes. In the future I may write a separate article on units and their conversions intended for non-engineers. For now just understand that kw and kwh are different units which means they cannot be added or subtracted.  

Utility companies generally charge by the kilowatt hour. Sometimes, depending on the rate scheme, they charge for kilowatt as well. Its worth asking what is a kilowatt hour. If the term is reduced into more simple units : 

$$ kwh =  1000 \ w \ h = 1000 \ \frac{J}{s} \  h  $$

where

​	*k*  = kilo = 1000

​	*w* = watt

​	*h* = hour

​	*J* = Joule

​	*s* = second

The expression above shows that a kwh is equivalent to 1000 Joules per second times an hour; this is not intuitive yet.  The second and hour are both units of time so lets get rid of them. 

$ kwh = 1000 \ \frac{J}{s} \ h = 1000 \ \frac{J}{s} \ 3600 \ s t$

The  *h* (hour) was swapped out for 3600 *s* , since one hour is 3600 seconds . The *s* is in the numerator and the denominator so it cancels out. The 1000 and the 3600 can be multpled and the *s*  can be cancelled which yields: 

$ kwh = 3600000 \ J $ 

It is apparent that *kwh* is just three million and six hundred thousand Joules. What are Joules?  Joules and thus kwh are both measures of **energy**. Utility companies usually just charge for energy . 

What is a kw? Going through similar math:

$ kw = 1000 \ w = 1000 \frac{J}{s}$

A *kw* is just a thousand Joules per second which is energy per time. Energy divided by times is **power**. *kw* is a unit of power. $ Power = \frac{Energy}{time}  $.  Power is a measure of how much energy is used in a specified time.  

The expression for power can be rearranged to get $ Energy= Power * time $.  Which is the form for *kwh*. kilowatt hour (Energy) = kilowatt (power) * hour (time). Perhaps this is why *kwh* is such a non-intuitive unit. It is a measure of energy using a power term (kw) multiplied by a time term (h). Which is a backward way to look at energy in my opinion.  kwh is simply compatible with kw which may be why the term is used. 

Consider that Colorado currently has an overall capacity of 1,150MW from hydropower[^1]. MW is a megawatt or $10^9$ watts. This is a measure of power not energy.   Hopefully by know you understand the difference between kwh and kw. Now figure out how many kwh Colorado gets from hydropower **per year**.

[^1]: https://www.colorado.gov/pacific/energyoffice/hydropower 