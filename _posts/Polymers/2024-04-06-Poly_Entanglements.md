---
title: Entanglements in polymers
layout: article_TOC
excerpt: Plastics and rubbers are composed of long molecules which become entangled
tags: Polymers
---

# What are Entanglements 

Recall that polymers consist of large chains of molecules. In some ways, this can be thought of as wet spaghetti or hair—with entangled strands, they turn into a solid. An entanglement is simply a kind of temporary interaction that occurs between neighboring strands. Tangled hair is a good analogy to understand entanglements. Below is a picture of the human biodiversity of hair [^hair]:

 ![Images-of-various-types-of-hair-illustrating-their-diversity-in-shape-Type-I-is-classifi](\assets\images\Images-of-various-types-of-hair-illustrating-their-diversity-in-shape-Type-I-is-classifi.png)

Intuitively, we can see that the hair I on the left will have fewer entanglements than hair **V**. Let's say, for the sake of conceptualizing this, hair III seems to have 1 entanglement and hair V has 10. If the strand length in the picture is 10 cm, then we can compute the entanglement length of these hair types.
For hair **III**,  $ L_{E, III} = 10cm $ and for hair **V** we divide the length by the number of entanglements to get  


$$
L_{E, III} = \frac{10cm}{10} = 1cm
$$


Thus, we can extrapolate that if hair **V** was cut to 1 cm length, then it would have one entanglement. This is basically the way we think about entanglements in polymers. The physical consequences of entanglements in polymers are vast, but to put it simply, they provide a resistance to deformation of the resulting polymer.

The amount of entanglements is generally not important. What matters, is that the strands are long enough to be entangled. 

 
# Computing entanglement molecular weight
## Computing entanglement molecular weight in polymer melts 

From the fundamental laws of rubber elasticity. The following equation applies to polymer melts (uncrosslinked polymers above their glass transition temperature)[^Mark]:

$$
M_e = \frac{\rho R T }{G_N^o} \label{M_e}
$$

Where $\rho$ is the density, $T$ is the temperature and $G_N^o$ is the plateau modulus. 

All that has to be done is perform rheology on the polymer melt and determine the $G_N^o$ plateau modulus in the rubbery regime.  



## Computing entanglement molecular weight in liquids

Another approach is to measure the viscosity of the polymer melt as a function of molecular weight [^Fetters]. Simply measure the viscosity for a series of polymer melts having different molecular weights. The resulting plot will have two regimes, the scaling of viscosity and molecular weight will change at a transition point at a critical molecular weight $M_c$:


$$
\eta_0 \propto M \ \ \ \  M<M_{\mathrm{c}}
\\
\eta_0 \propto M^{3.4} \ \ \ \ M>M_{\mathrm{c}}
$$

The critical molecular weight is related to the entanglement molecular weight via the packing length. To a reasonable approximation in can be assumed:
$$
M_c = 2M_e
$$




## Computing entanglement molecular weight in polymer networks

When the polymer has crosslinks, it is a bit less straightforward to compute the number of entanglements. In fact **equation $\ref{M_e}$** cannot be applied here. We must account for the cumulative effect of crosslinks and entanglements. We can consider an additive effect of the shear modulus[^Rubinstein]: 


$$
G \approx G_x + G_e \approx \rho R T (\frac{1}{M_x} + \frac{1}{M_e})
$$

Where $M_x$ is the molecular weight between crosslinks. 


# Tabulated entanglement molecular weights

It is typically not necessary to perform the above experiments to determine $M_e$. The values of $M_e$ for most common polymers are tabulated and available online. Here is a short list [^Markid]:

| Polymer                  | T [<sup>o</sup>C] | $G^o_N$ [Mpa] | $M_e$ [g/mol]  |
| ------------------------ | ----------------- | ----------- | ------ |
| Polystyrene (atactic)    | 190               | 0.2         | 18,700 |
| Poly(1-butene) (atactic) | 30                | 0.19        | 11,600 |
| Poly(dimethyl siloxane)  | 25                | 0.24        | 10,000 |
| Polyisobutylene          | 25                | 0.32        | 6,900  |
| 1,4-Polyisoprene         | 25                | 0.35        | 6,400  |
| 1,2-Polybutadiene        | 50                | 0.42        | 5,700  |
| Polypropylene (atactic)  | 75                | 0.85        | 5,000  |
| 1,4-Polybutadiene        | 25                | 1.15        | 1,900  |
| Polyethylene             | 150               | 2.2         | 1,100  |




##  Example calculation

Example calculation of entanglement molecular weight by rheology. Following the values in the table provided for Polystyrene (atactic), we can determine the theoretical entanglement molecular weight: 

$$
M_e = \frac{\rho R T }{G_N^o} = \frac{(1050 \ kg/m^3) (8.314 \ J  / mol \ K) (463 K )}{ 0.2 \cdot 10^{6} \ N/m^2} = 18.4 \ \frac{kg \ J}{mol \ N  \ m} = 20 \ \frac{kg }{mol}
$$

This is not quite what was tabulated but that could be attributed to a density being slightly off. 


We can look at some research papers to confirm what theory tells us. For butyl acrylate  $M_e=28kg/mol$ according to [^PBA]. If we plug this into eq $\ref{M_e}$ to determine the plateau modulus $G_e^*$ we compute $G_o^E \approx 0.08MPa$  which is close to what is shown [^UHMW][in this paper] where they measure the rheology of butyl acrylate polymer melts having very different molecular weights. It is consistent with our theory that regardless of the molecular weight, the plateau modulus is the same.  

# References

[^Fetters]: Fetters, et al., *Packing Length Influence in Linear Polymer Melts on the Entanglement, Critical, and Reptation Molecular Weights*, *Macromolecules*, 1999.
[^hair]: McMullen et al., *Quantifying Hair Shape and Hair Damage Induced During Reshaping of Hair,* *J Cosmet. Sci.*, 2015.
[^rubbery regime]: [Link to FM Rheology Post]({{site.baseurl}}/2024/01/28/FM_Rheology.html)
[^Mark]: Mark, *Physical Properties of Polymers*, 3rd ed., 2003, Equation 3.44.
[^Markid]: [^Mark], pg. 191.
[^Rubinstein]: Rubinstein & Colby, *Polymer Physics*, 2003.
[^PBA]: Lu et al., *All Acrylic-Based Thermoplastic Elastomers with High Upper Service Temperature and Superior Mechanical Properties,* *Polymer Chemistry*, 2017.
[^UHMW]: Diodati et al., *Unraveling the Properties of Ultrahigh Molecular Weight Polyacrylates,* *ACS Appl. Polym. Mater.*, 5, 9714–9720 (2023).
