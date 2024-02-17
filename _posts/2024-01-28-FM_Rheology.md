---
title: Rheology
tags: FractureMechanics
layout: article_post_TOC
toc: true
excerpt: The study of flow and deformation of soft materials.  
---




# Rheology

Rheology is the study of the flow and deformation of materials, particularly liquids and soft solids like pastes, gels and soft adhesives. It explores how these substances respond to applied forces, such as stress or strain. Understanding rheology is crucial in various industries, including food, cosmetics, pharmaceuticals, and manufacturing. For example, in food production, rheology helps determine the texture and consistency of products like sauces, spreads, and doughs. In fracture mechanics, we want to know how stiff or soft the material behaves at different rates. This helps us predict how it will behave when used. Such as the conditions at which the material may fracture. 

The properties are measured by preparing thin specimen of material and placing it between two probes in a device called a rheometer - the geometry is shown in the figure below. The top probe will oscillate back and forth at angular frequency $\omega$,  and the torque is measured. The imposed angular frequency tells us the strain and strain rate the sample is feeling. The measured torque tells us the stress the sample feels. 

<img src="\assets\images\Fracture Mechanics\RheometerGeometry.png" alt="Peeling90Degrees" style="zoom:30%; margin-left: auto; margin-right: auto;" />

In fracture mechanics, two common rheological tests are often employed to study the behavior of materials: the strain sweep and the frequency sweep. A strain sweep involves subjecting a material to varying levels of strain while measuring its response, typically in terms of stress. This test helps determine the material's strain-dependent behavior, such as its flow properties under different levels of deformation. On the other hand, a frequency sweep assesses how a material's rheological properties change at different frequencies (rates) of applied strain. By varying the frequency, it can be determined material's viscosity, elasticity, or other rheological parameters respond to dynamic loading conditions. 

## Strain Sweep

This test consists of oscillating at a fixed angular frequency $\omega$ and increasing the angular displacement. In other words, the strain rate is held constant, and the strain is increased. The Storage  modulus (G') and Loss modulus (G'') are measured. These correspond to the solid and liquid contributions to the total stiffness respectively.  It may be confusing to think about the material having two contributions to stiffness  but it provides much more insight once these are fully understood. 



Consider the example strain sweep result shown below. The first thing to note is that G'' is larger than G', which implies the material is dominated by liquid contributions to stiffness. The interpretation of this will be discussed in the next section. The second thing to note is that both G' and G'' are constant until about 10% strain. This regime of strain in which G' and G'' are constant with strain is known as the **Linear Visco-elastic Regime (LVR)** and is important because arguments which exploit G' and G'' should only be applied when strains are within the LVR. Moreover, furthur rheological tests should be performed at strains within this regime. 

<img src="\assets\images\Fracture Mechanics\StrainSweep.png" alt="Peeling90Degrees" style="zoom:20%; margin-left: auto; margin-right: auto;" />

## The Storage and Loss Modulus  (G' and G'') 

As stated earlier, G' is the solid contribution to stiffness and G'' is the liquid contribution to stiffness. This is best thought of in terms of recovered forces when deforming the material. Say, you drop a ball composed of this material, if it behaves like a solid such as a bouncing ball (G' >> G'') it will bounce back to NEAR its original height.  If you were to try this experiment with something like silly putty which is very liquid-like (G'' >>  G' ) it would not bounce up very high at all. That is a rough picture of what these terms imply. Often, the same data is presented in terms of a **tangent factor** $tan(\delta) \equiv G"/G'$ and a **complex modulus** $G^* = \sqrt{(G')^2 + (G'')^2}$. It may take some practice to make sense of these alternative terms, but they portray the same information.  Basically the tangent factor is large for liquid-like behavior and small for solid-like behavior; the complex modulus represents the total resistance to deformation. 

<img src="\assets\images\Fracture Mechanics\BouncingBall.png" style="zoom:30%; margin-left: auto; margin-right: auto;" />



## Frequency Sweep

We know want to how the material behaves at different times. We set the strain, within the linear-viscoelastic regime and change the angular frequency $\omega$. A storage and loss modulus is measured at every frequency. The plot below is some example data. This is a typical plot for a rubber. Although, it would be quite rare to capture the entire domain of frequencies - only a narrow window of this data would be measured. 

There are four regimes of material behavior. For rates at which a rubber is typically used, it will be in the middle rubbery regime. Note at very long times it may enter the terminal regime, in which the the stiffness decreases without bound (i.e. it behaves as a liquid). Not all materials have a terminal regime. At very high rates, the molecules do not have time to accommodate the deformation, so they are locked in place and behave very stiff. The transition regime is between the glassy and rubbery - the transition from entropic elasticity to enthalpic elasticity.  



<img src="\assets\images\Fracture Mechanics\FrequencySweep.png" style="zoom:20%; margin-left: auto; margin-right: auto;" />



## General Insights

Dissipation refers to energy which is lost to random molecular motion, rather than stored in the material. The amount of energy dissipation is on the order of G''. It follows that the ratio of energy dissipated to energy stored is $G''/G'$ which recall is defined as the loss factor $tan(\delta)$. It is clear that high ratios of energy dissipation occur within the terminal and transitional regimes. Typically the resistance to fracture is proportional to the ratio of energy dissipated. As expected the terminal regime (liquid-like) is very resistant to fracture. The transition regime is also highly resistant to fracture. Further reading can be found in this great introduction to rheology here [^Ramli]. 



[^Ramli]: Ramli, H., Zainal, N. F. A., Hess, M. & Chan, C. H. Basic principle and good practices of rheology for polymers for teachers and beginners. *Chemistry Teacher International* **4**, 307–326 (2022).





