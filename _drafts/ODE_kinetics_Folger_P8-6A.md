---
tags:
- draft
- python
- school
- kinetics 
---




```python
# solves problem 8-6A in Elements of Chemical Reaion Engineering 4ed

X_init = 0.0	# initial condition on V 
X_final = 0.9 # final condition on V
N = 100	# number of steps
delta = (X_final-X_init)/N		# change in the differential 

print("delta: ", delta)
print("N: ", N)
import numpy as np
import matplotlib.pyplot as plt
V = np.zeros(N)
T = np.zeros(N)
x = np.zeros(N)

Ca0 = 0.1
fa0 = 0.2

'''	
Temperature as a function of conversion
'''
def Temp(x):
	# x=conversion
​	return 300 + 200 * x


'''	
k as a function of temperature
'''
def k_const(T):
	# T=temperature
	k = 0.01* np.exp( (10000.0/2.0)*(1.0/300.0-1.0/T) )
	# print("T: ", T, " K: " , k)
	return k


'''
rate of reaction as a function of k and x
'''
def rate(X, k):
	# X=conversion 
	# k=rate constant
	rate = -1.0*k*(Ca0**2)*(1.0-X)**2
	# print("ca0: ", Ca0, ", X: ", X, ", k: ", k, " rate: ", rate)
	return rate


'''
differential of V wrt x
'''
def dV_dx(F, r):
	# F=initial flow rate
	# r=rate of reaction
	return -(F/r)


_x = 0.0	# initial step is at x=0 
for n in range(0,N):	# g through each step n = [0,N]
	T[n] = Temp(_x)
	k = k_const(T[n])
	r = rate(_x, k)
	print( "( T, k, r ): ", T[n], ", ", k, ", ",  r )
	V[n] = V[n-1] + delta * dV_dx(fa0,r)
	_x = _x + delta; 
	x[n] = _x;

# plotting X as a fn of V
plt.plot(V, x)
plt.xlabel('V')
plt.ylabel('x')
plt.show()

#plotting temperture as a fn of V
plt.plot(V, T)
plt.xlabel('V')
plt.ylabel('T')
plt.show()
print(T)
```