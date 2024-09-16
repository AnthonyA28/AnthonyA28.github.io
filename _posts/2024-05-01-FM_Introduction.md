---
title: Introduction to Fracture 
tags: FractureMechanics
layout: article_post_TOC
toc: true

---

The study of fracture is the study of failure of materials. We want to 1. determine the loads at which a material fail  2. Predict this from the material structure. For example: 1. use a measured force at which a metal beam snaps to predict at which pressure it will explode if used as a pipe, 2. if we know what the metal is composed of and how it was processed, can we predict the force?  



Consider the quintessential example of material failure. The Titanic hit an iceberg, fractured and then sank. People believed the Titanic was perfectly robust, but they did not know that under very cold conditions, the metals of the hull become brittle and become prone to fracture propagation. 



Material failure is a  perpetual problem - with us for all of history. When oil pipes crack, they release oils into the environment. Recently, the new phones with foldable screens have demonstrated that even modern technology has trouble avoiding material failure. 



<div style="display: flex; justify-content: center; align-items: center; gap: 20px;">
    <figure style="display: flex; flex-direction: column; align-items: center; text-align: center; margin: 0;">
        <img src="\assets\images\FM\Titanic.jpg" alt="Titanic" style="height: 200px; object-fit: cover;" />
        <figcaption style="color: gray;">Titanic</figcaption>
    </figure>
    <figure style="display: flex; flex-direction: column; align-items: center; text-align: center; margin: 0;">
        <img src="\assets\images\FM\OilSpill.jpg" alt="Oil Spill" style="height: 200px; object-fit: cover;" />
        <figcaption style="color: gray;">Kalamazoo River oil spill, 2010</figcaption>
    </figure>
    <figure style="display: flex; flex-direction: column; align-items: center; text-align: center; margin: 0;">
        <img src="\assets\images\FM\flipphone.jpg" alt="Flip Phone" style="height: 200px; object-fit: cover;" />
        <figcaption style="color: gray;">Samsung flip phone</figcaption>
    </figure>
</div>


# Measuring Fracture Toughness

To quantify the strength of a material or its resistance to fracture,  we measure the fracture toughness. We can do an energy balance on a stressed specimen to do this. We simply stretch the specimen and measure the force required to do this.  



Consider a specimen for which some deformation $\Delta $ is applied. The force applied to reach this deformation is $F$. The balance of energy in this case is simply the applied work $W$ is equal to the *strain energy* $U$ in the material. 

$$
\begin{equation}
W = U \label{EnergyBalance}
\end{equation}
$$

<div style="display: flex; justify-content: center; align-items: center;">
    <img src="\assets\images\FM\InternalEnergy.jpg" alt="internalEnergy" style="height: 200px; object-fit: cover;" />
</div>

The applied work in a mechanical system is always the force multiplied by the displacement. For a linear elastic system, the force and displacement are related by the stiffness $k$ of the material: $F = k\Delta$. The work is then simply: 
$$
\begin{equation}
W = \int Fd\Delta = \int k\Delta  d\Delta = \frac{1}{2} k\Delta^2 \
\end{equation}
$$

From the work we know the strain energy by using eq. $\eqref{EnergyBalance}$.  

## Rivlin and Thomas Approach

We should now consider the *potential energy* ($\Pi$) of the system which is defined as 

$$
\Pi \equiv U - F \Delta
$$


The the energy release rate is defined as the following: 

$$
G \equiv \frac{d\Pi}{da}
$$

where $a$ is the surface area of a crack. 

<div style="display: flex; justify-content: center; align-items: center;">
    <img src="\assets\images\FM\EnergyReleaseRate.jpg" alt="EnergyReleaseRate" style="height: 200px; object-fit: cover;" />
</div>
We should not that $G$ is the amount of energy if the crack grows. The *Critical Energy Release Rate* $G_c$ is the value at which the crack actually propogates is frequently reffered to as the toughness $\Gamma$ .

Now we can consider an experiment to measure the toughness ($G_c$ or $\Gamma$). We can simply determine the $\Pi$ at the instant of crack growth for different crack lengths. Simply stretch a number of samples each with different initial crack lengths and determine the $\Pi$ at which the crack grows. This is what Rivlin and Thomas did in 1952. The following figure shows the potential energy at which the crack grows for different initial crack lengths. They use $W$ in place of $\Pi$ and $c$ in place of $a$.

<div style="display: flex; justify-content: center; align-items: center;">
    <img src="\assets\images\FM\RivlinThomas1953.jpg" alt="Rivlin and Thomas" style="height: 200px; object-fit: cover;" />
</div>

Since $G$ is expected to be a material property and constant with respect to crack size, he slope of the above curve is $\Gamma$: 


$$
\begin{equation}
\Gamma = -\frac{d\Pi}{da} = -\frac{\Delta \Pi}{\Delta a }
\end{equation}
$$


Thus we can measure the material toughness by cutting a number of samples, stretching them until the notch propagates, then determining the change in potential energy with initial notch size. 

## Greensmith 

The Greensmith approach uses a scaling analysis to reduce the Rivlin and Thomas so that only two specimens are required. The final equation is:


$$
\Gamma = 2kaU_c
$$

where $k$ is some prefactor, dependent upon strain, and $U_c$ is the strain energy density of an unnotched sample at the stretch at which the crack in the notched sample propagates. A paper in 2011 by Cristiano suggests that, for a single edge notch sample as shown in the figures above, using $k = \frac{3}{\sqrt{\lambda_c}}$ where $\lambda_c$ is the stretch at which the crack propagates. So the Greensmith model becomes:

$$
\begin{equation}
\Gamma = \frac{6}{\sqrt{\lambda_c}} a U_c
\end{equation}
$$

With this we only have to do two tests to measure the fracture energy. Simply stretch a notched sample until the fracture propagates, then stretch an unnotched sample up until $\lambda_c$.

# Predicting Toughness

## Griffith Approach

The first and most notable attempt at predicting $\Gamma$ was done by Alan Griffith in 1920. He performed a number of experiments to determine the surface energy of glass. Then he determined a condition at which the crack will grow. He stated that a crack will grow when the total energy of the system decreases: 

$$
\frac{d(\Pi + U_s)}{da} \le 0
$$

where $U_s$ is the total surface energy of the crack. For a crack of length $a$, having $2$ faces, the total surface energy is $U_s = 2a \gamma $, where $\gamma$ is the surface energy of the material. The surface energy can be determined independently $\gamma$; Griffith blew bubbles of hot glass to determine $\gamma$.


$$
\frac{d(\Pi + U_s)}{da} \le 0
\\
\frac{d(\Pi + 2a \gamma)}{da} \le 0
\\
\frac{d \Pi }{da} \le -2 \gamma
$$


So the crack will start to grow when: 




$$
-\frac{d \Pi }{da} = 2 \gamma
$$


Thus:


$$
\Gamma = 2\gamma
$$


which is a remarkably simple result. That is, the energy required to propagate a crack in a glass is equal to 2 times the surface energy of the glass. Note this is only the case for glass. Metals, plastics and rubbers do not have such simple physics, and predicting $\Gamma$ is the subject of significant research.  























