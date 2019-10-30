---
title: How to make a VLE Diagram
layout: article_post
section: article
excerpt: Making a VLE entails applying a few simple formulas. 
---

# How to Make a VLE Diagram



## Rault's Law 

Rault's law states how the partial pressure of a gas is proportional to its concentration both within the gas and in the solution in equilibrium with the gas. 
$$
p_a = y_aP = x_ap^*_a(T)
$$
where, $p_a$ is the partial pressure of component *a*; $y_a$ is the concentration of *a* in the gas; $P$ is the total pressure of the gas; $x_a$ is the concentration of *a* in the liquid; $p^*_a(T)$ is the a vapor pressure of pure *a* at temperature *T*.

----



## Dalton's Law

 Dalton's law states that the sum of partial pressures is equal to the partial pressure. If a system contained two components: *a* and *b* , then the total pressure of the system would be:
$$
P = p_a + p_b
$$
where,  $p_b$ is the partial pressure of component *b*.

----

## Antoine Equation

The Antoine equation allows one to solve for the vapor pressures of a component at different temperatures. It is an empirical relationship with constants found in the literature. 
$$
p* = 10^{[A - \frac{B}{C+T}]}
$$

----

## Combining 

If the partial pressures in Dalton's Law (equation (1)) are substituted into Rault's Law (equation (2)), the following equation is developed:
$$
P = x_ap*_a + x_bp^*_b
$$
and since we just have two components we can say: 
$$
1 = x_a + x_b
$$
Substituting equation (5) into equation (4) yields: 
$$
P = x_ap*_a + (1-x_a)p^*_b
$$

If equation (6) is rearranged to isolate $x_a$, then is becomes:
$$
x_a = \frac{P-p^*_b}{p^*_a - p^*_b}
$$

Equation (3) at a known *T* can be used to solve for $p_a$ and $p_b$. The temperatures to be used are those within the range of boiling points between the two components. Then $p_a$ and $p_b$ can be plugged into equation (6) at a known *P* ( whatever your system is at - probably 1 atm) to solve for $x_a$. Then use equation (5) to solve for $x_b$. Finally use equation (1) to solve for $y_a$ and $y_b$.

