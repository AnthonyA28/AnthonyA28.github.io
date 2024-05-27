---
title: Fracture Introduction
tags: FractureMechanics
layout: post
toc: true
---

Fracture mechanics consists of determining the conditions at which a material defect will grow. Consider an example.



We can start any analysis of fracture mechanics by thinking about the energy of creating a surface. The following analysis applies to interfaces (adhesion) and cracks (defects in solids) alike. The analysis in debonding tape is the simplest to demonstrate. 

Imagine you are pulling a tape from a surface at 90 degrees - perpendicular to the surface. See the figure below. The force you apply when pulling is $F$. Initially the free region (not bonded) is of length $L$, so when you peel, you change it $dL$. When pulling at 90 degrees, **the decrease in bonded surface is also $dL$.**  The work that you apply when pulling is simply the force multiplied by the displacement: 


$$
\begin{equation}
W = FdL \label{work}
\end{equation}
$$



<img src="\assets\images\Fracture Mechanics\Peeling90Degrees.png" alt="Peeling90Degrees" style="zoom:15%; margin-left: auto; margin-right: auto;" />

To satisfy the first law of Thermodynamics, this work must be transferred to something. It is transferred to creating the newly exposed surfaces (red line in the figure). We can define an intensive variable associated with the change in surface - call it the *Energy Release Rate* ($G$) .  So the change in energy associated with exposing these surfaces is $G$  multiplied by the change in exposed area: 

$$
E_{surface} = GdA
$$

The area of the exposed surface is equivalent to the width ($b$) times the length $dL$: 

$$
\begin{equation}
GdA = GbdL \label{surfaceEnergy}
\end{equation}
$$

Now we shall complete the energy balance. The work applied from your hand must be equal to the energy released when creating new surfaces. That is, combine equations $\eqref{work}$  and $\eqref{surfaceEnergy}$

$$
\begin{align}
W &= E_{surface}
\\
 FdL &= GbdL
\end{align}
$$

Divide $dL$ in both sides to arrive at: 

$$
\begin{equation}
F =Gb \label{ERR}
\end{equation}
$$

$G$ is a constant associated with exposing the surfaces. Typically it has units of Joules per meters squared  $[J/m^2]$. As you can see, it can also be expressed in terms of $[N/m]$. Keep in mind that $G$ will depend upon which surface the tape is bonded to. Lets assume that for whatever the tape is bonded to, $G$ is $500N/m$. So, if $b$ is 1cm ($0.01m$) then, after plugging into equation $\eqref{ERR}$, $F = 5N$ which is about a pound.



We also see from equation $\eqref{ERR}$ that the debonding force $F$ increases linearly with the width of the tape. This is indeed intuitive.  What is not intuitive, is the following. What if we debond at a different angle? The length associated with applying work is different from the length associated with crack surface. 

<img src="\assets\images\Fracture Mechanics\Peeling45Degrees.png" alt="Peeling45Degrees" style="zoom:15%; margin-left: auto; margin-right: auto;" />

In fact, the appropriate equation for the energy release rate at any peel angle is known [^kendall]  : 


$$
F = \frac{Gb}{1-cos(\theta)}
$$

So now if we peel at 90 degrees we can back-compute the $G$, then determine how much force would be required if we peel at a different angle. You likely have already experienced this, but the force decreases by orders of magnitude as you increase the peel angle (see the figure below). It is interesting to note that the force goes to infinity as the angle goes to zero. This issue will be addressed in later posts. 

<img src="\assets\images\Fracture Mechanics\PeelAnglePlot.png" alt="PeelPlot" style="zoom:15%; margin-left: auto; margin-right: auto;" />

We know now how to measure $G$ but we are still left with the following questions. 

* What happens at 0 degree peeling? 
* How can we predict $G$ from what material the bond consists of? 
* What about cracks in homogeneous materials?

[^kendall]: Kendall, K. Thin-film peeling-the elastic term. J. Phys. D: Appl. Phys. 8, 1449–1452 (1975).
