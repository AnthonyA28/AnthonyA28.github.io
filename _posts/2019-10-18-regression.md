---
title: Regression
layout: article_post
section: article
excerpt: Applying regression to relate power to energy usage. 
tags:
- draft
---



###  Objective:

Apply linear regression to predict the kw (power) usage from kw-h (energy) commercial rate payers in Gainesville FL. 



### Methods:

Set up a local Xampp server in order to run SQL commands o n the data. Export the matched Kw and Kw-h samples into Excel. Remove outliers by subgrouping and removing samples outside of 3 sigma. Utilize Excel's built in functions to regress Kw onto Kw-h. Determine the function that minimizes  r <sup>2</sup>.



#### What is Power and Energy?

Energy is typically measured in Joules. a Joule is defined as force times distance: N • m (Newtons times meters). Power is energy divided by time. If the energy definition is divided by time in seconds, we have: N • m / s (Newtons times meters divided by seconds), this is a Watt (W).  A Kw is thousand watts, or a thousand units of power. Recall that power is energy divided by time, therefore energy is power times time.  Multiplying power the unit - kw - by hours gives kw-h which is energy. These units are somewhat counterintuitive because energy is defined in terms of a power unit (kw) multiplied by a time unit (hours). Just remember that kw is power and kw-h is energy and power is energy per time. 

___

#### Get The Data

Lets jump right in. First we need to acquire some data to develop the model. Since I already have a SQL database setup with the relevant data, a simple SQL query can be used.


    SELECT meter_kwh.consumption, meter_kw.amount FROM meter_kwh  
    	JOIN meter_kw on 
    		meter_kw.id=meter_kwh.id 
    		AND meter_kw.cycle_end=meter_kwh.cycle_end 
    		AND meter_kw.meternum=meter_kwh.meternum  
    		AND meter_kw.amount > 0 
    		AND meter_kwh.consumption > 0 
    	order by meter_kw.cycle_end desc
    	LIMIT 1000

The above yields the last 1000 meter readings where both kw and kw-h were measured on the same meter, on the same date, and neither readings were zero. The output is then exported to a csv file and opened in excel. Plotting amount against consumption yields the plot below. 

![](\assets\images\regression\plot_1.png)

The trend is clearly linear with a few outliers. Lets have Excel determine a trendline: right click on a blue dot in the graph and click from the dropdown menu - add trendline. Then trendline format menu should come up. It will default to a linear trendline but it will not show the equation, click *Display Equation on chart* and * *Display Equation R-squared value on chart* 

![](\assets\images\regression\plot_2.png)

The trendline follows the data nicely although the R-squared value is kind of low. This is generally an indication of goodness of fit of the trendline. Although in this case it can be attributed to the variability and the outliers. There are three points in particular that appear to be outliers in the plot above, they are skewing the data.  Lets remove them.  The R-squared value increases to 0.9009. 

![1571548241873](\assets\images\regression\plot_3.png)

Now the equation y = 0.002x + 12.181 can be used to relate energy to power. 

**Kw = 0.002  •  (Kw-h) + 12.181**