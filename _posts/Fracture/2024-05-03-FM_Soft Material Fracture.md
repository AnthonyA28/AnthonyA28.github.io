---
title: Soft Material Fracture
tags: FractureMechanics
layout: article_TOC
excerpt: Introduction to the unique attributes of fracture in soft materials.
# layout: article_post_TOC
---



# Rate Effects in Fracture


Lets try to understand the physics of debonding tapes. You should first familiarize yourself with what a PSA is and the basics of [rheology](/2024/01/28/FM_Rheology.html). Below I show a recreated plot from a famous paper by Gent [^Gent].  The experiment consisted of peeling tapes at different peel rates. During debonding, they measure how much force is required to debond at that rate. Clearly if you were to debond at 0.0001cm/s and increase the peel rate, the debond force would increase signifcantly. But it reaches a limit and some interesting things hapen. 

<img src="\assets\images\Fracture Mechanics\PeelRatePlot.png" alt="Peeling90Degrees" style="zoom:30%; margin-left: auto; margin-right: auto;" />



We see now that peel force may increase or decrease with peel rete depending on which rate it it is peeled. Also, there is a transition from cohesive failure (leaves a residue) and adhesive failure (leaves no residue). 

To try and make sense of this plot, they measured the elastic  modulus of the PSA at similar rates as it was peeled and placed the data on the same plot, this is approximately reproduced below. The Perhaps it would have been better to measure the G' and G'' via rheology, but the elastic modulus is sufficient for this purpose. It became clear that the different behaviors of the debonding coincided with different regimes of mechanical behavior. See the [rheology page](/2024/01/28/FM_Rheology.html) for an explanation of this regimes in terms of measured moduli. 

<img src="\assets\images\Fracture Mechanics\PeelRatePlot2.png" alt="Peeling90Degrees" style="zoom:30%; margin-left: auto; margin-right: auto;" />



## Debonding Regimes

The viscous regime occurs at very low rates, when the adhesive is very soft and behaves as a liquid. Because it is so soft, cavities can nucleate  within the adhesive. Because it is liquid-like, large amounts of energy dissipation occurs over a large length scale [^deGennes]. Also, due to it behaving as a liquid, it will debond cohesively (leave a residue).  

The rubbery regime exists at intermediate rates, whereby the adhesive behaves as a rubber which is much stiffer than its viscous state. It does not dissipate as much energy which is why it has a much lower peel forces.  This regime is ideal because the peel forces are relatively high and not residue is left on the interface. 

The glassy regime occurs at very high rates, in which the adhesive is in its glassy state. it is typically much stiffer in this regime. Gent makes an interesting point that none of the work applies goes into deforming the adhesive, it goes straight into debonding at the interface. This is why the peel forces are typically very low here. They actually show that if the adhesive is forced to absorb the energy during debonding, then they glassy decrease in peel force disappears - the peel force continues to increase. 




[^Gent]: Gent, A. N. & Petrich, R. P. Adhesion of viscoelastic materials to rigid substrates. *Proceedings of the Royal Society of London. A. Mathematical and Physical Sciences* **310**, 433–448 (1969).

[^deGennes]: de Gennes, P. G. Soft Adhesives. Langmuir 12, 4497–4500 (1996).


