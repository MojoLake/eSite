## Day 1


## Day 2
Decided to learn the assembly commands so I can actually read them. For one day had relied on AI interpreting it for me but this is not good. I need to understand it properly.

What if we have the vectors in different order?
In the end we are just doing dot(i, j).


## Day 3
I'm lost. Grinded yesterday and got 3a pretty good but still over 3 seconds.
Today I'm trying to be systematic and deep: understand exactly what my current code is doing. Read the assembly and dive deep. I think slowing down now and going deep will benefit me later in the course.

Okay I found out that I can do remote tests and the submission machine without making a submission. This alone is very helpful. BUT now I learned that I can also run `benchmark-cache` to observe the cache behaviour and see how many L{1, 2, 3}-cache misses my code does.

Plan of action after seeing Jukka's tips:
1. Let's figure out B so that there is no register spilling. I assume it is B = 5 because we have 32 AVX-512 512-bit wide registers and so with B = 5 we are using 25 for the accumulators and we have 7 more for helping. 6 is definitely too much and 4 might be too little.
2. How to keep FMA units fully utilised? Chapter 2 parts V4 and V5!
3. Do the math: how much memory reading will we actually need to do and then compare it to L{1, 2, 3} sizes and memory bandwidth.
4. Based on the math decide how to continue: try to utilize L1 or is it enough if everything hits L2?
5. Then start to implement suitable cache-blocking (Chapter 2, V7)


Notes about each step:

1. I will generate assembly for B = 4, 5, 6 and see where the register spilling starts. I'll first try to read the assembly myself and figure it out but ask AI for confirmation of my findings.

I found out that with B = 4 we have no register spill in the hot loop while with B = 5 there is still some register spilling. This can be noticed by seeing %sfp (stack frame pointer)s in the assembly: we are putting stuff to memory. Of course they go to L1-cache but still bad since it at least halves our theoretical throughput because each CPU core is able to perform 2 operations per cycle and they really do this if the values are in registers and thus don't need to be loaded. But even if we have to read L1, each CPU core can read max. 2 vectors from L1 per clock cycle but we need FOUR operands per cycle to support TWO operations per clock cycle. So even if we perfectly use L1 we might be slowing ourselves by 2x!!!

So eg. `vaddss` has a throughput of 2 per clock cycle. More precisely, there are two exeuction ports: port0 and port1 in the CPU core that are able to run eg. `vaddss`. Thus we can hope (at best) to complete 2 operations per clock cycle per CPU core.

A modern CPU in the same cycle can (roughly, depending on the CPU):
- decode some instructions (is this relevant for us? apparently not too relevant)
- starts 2 loads from L1-cache. (but doesn't it just load from memory and hope for cache hit?: no, first it translates the virtual memory address to physical, then check L1-cache, if miss then next clock-cycle check L-2 cache (takes many cycle I think), etc..)
- start to vaddss operations (or any other pretty much)


Rough numbers:
1. TLB + L-1 check: 4-5 cycles
2. L2: 10-15 cycles
L3: 30-50+ cycles
DR: 100-300+ cycles
TLB miss with page walk: tens to hundreds of cycles



- THE NON-linear reading of y from n2 might be bad!


So the plan is now to analyse what our code really does and calculate cache stuff.


vastaa juhomatti
ja tee aineen rakenne
- ja databricks hommat

## Day 4.
Now we are testing how fast our code would be if we only got L1 hits.
Result: very fast. 1.593s. 0.50% cache misses. 9.5 simultaneous threads, why so little?

This means that in the current solution the arithmetic units of the CPU are still part of the time idle, waiting for data from the memory. Two solutions: reduce the number of memory reads or make them more cache efficient.

Some mathematics:
9000x9000 image.
So we need to calculate 9000x9000 / 2 results. One pass calculates 4x4 results and one pass (block) reads 8 x 9000 double-precision floating point numbers, each 8 bytes.

1.4 trillion = 1458 billion floating-point numbers.

Within a block we are reading:
8 x 9000 * 9 = 576 kB which in no way has chance of fitting inside L1 but does fit in L2.

So then we could think how to do the additional cache-blocking thing so that they fit in L3 cache (note that this is for all the 20 threads meaning there is only 1MB per thread)

In a way B = 3 might be better because then we can fit both threads of a core to the L2 cache. Let's keep that in mind.


What if one vector was values in 8 columns.
It would be like vector * vector_shitf.


Right now we read 8 vectors from memory to registers and are able to get 16 results: 2 to 1.
Or if we did no blocking we would read 2 vectors and get 1: 1 to 2 lol.

Instead we could read 2 vectors and get 16 output: 8 to 1!!

We could compute whole row of vectors so 8 * 9000 = 72000 results at once.
This amounts to 72000 * 8 bytes = 576 kB which again doesn't quite fit L2 if we use 20 threads. But maybe we can accumulate the results as floats? Probably not. But hey it's worth trying. And we might be able to optimise the memory usage so that the cache spilling doesn't matter too much??

We had like 9.55s previously on 3.txt. Now we have 9.064s so yeah improvement ofc.
Whooh 1.229s


So what ideas do we have now?
Prefetching?
Different iteration scheme?


In our loop now we have:
- 8 accumulators
- we are reading `nx` times col1 and col2
    - This amounts to `nx * 2` vectors read per row-pair
        = 9000 * 2 * 8 doubles
        = 9000 * 2 * 8 * 8 bytes = 1.15 MB -> does not fit in L2. We should cut the rows.

So next things:

- Try cutting the rows to blocks.
- Some blocking stuff?
- Z-order but for triangle?
- What even are the bottlenecks right now? Threading and cache.


Questions for TA:
- is it possible to figure out the L2-cache hit rate from this stuff?
- 


Day 5:
Some reflection:
I have been coding and doing this like a monkey. Just trying new things, changing some small parameter and then running the benchmarks. I should do this more intentionally. Reduce the number of benchmarks run. Calculate the fucking cache sizes and optimize intentionally and always make your best prediction of the result and only then run the benchmarks. That way you actually start understanding the behaviour. That way you challenge your brain to go deep. Read the fucking assembly. Never run benchmarks before you have read the assembly.


REMEMBER TO TEST THAT IT WORKS NOT JUST BENCHMARK!! TESTING SHOULD BE DONE CONSTANTLY!!


Notes from Unto:
- Z-order!!
- Do also blocking of rows, not just columns
- Texas university matrix multiplication paper?


We could also try using 256 vectors. Then we would have more registers to use I suppose.


Day 6:
We need to take a break. But notes first:
When we read one vector, we actually read a whole cache line so there is no reuse!
That's why it's important to go s1 and s2 in blocks so we get some reuse.


Progress bar for auto construct.


## Day 7

1. Remote machine contention? The instability starts below L2, mainly at L3/RAM?
2. 

4. Initialization has false sharing. Let's instead iterate over each vectors per input column so we are safer.
5. Okay the CPU is single-socket so the synchronous col_v initialisation should not matter that much.
6. Why are we getting high page faults?
7. 


The problem is that we are getting random variance when it comes to L3 hits. We need to structure our code so that we really get those L3 hits.

I'm now testing whether we get more deterministic results when using just on thread.

Indeed we do. So the undeterminism comes from luck in hitting the L3 cache or not.

Now we are rewriting the whole thing to gain understanding etc. The Tourist tactic!!


### Notes from rewriting
So our current memory/array structure is:
    - col_v[VECTORS_PER_INPUT_COLUMN_PADDED][NX_PADDED](and kinda VECTOR_LEN)
What if we instead iterate over NX_PADDED in the outermost loop?
We could get better thread reuse!? We could go over NX in blocks!

- The a[j] = col_v[(r2_col + j) * NX_PADDED + col]; has kind of inoptimal memory access pattern. Would be be better if the col was the innermost loop when doing that instead of the j...


- So how the 


Okay we got 1.7s. Now we just have to try the Z-order combined to that.


TODO:
1. optimize col_v calculation
2. try different values


# Day idk wappu morning
We are aiming for sub 1 second on 3a.

Ideas:
- don't do repeated shuffles in the microkernel, eg. right now we are computing a4 = swap(a0) repeatedly when 

- 


# Day 10??
We are at 1.02s. Our strategy is to grind 3ab so that no one else gets extra points and that way destroy and discourage the competitors! In addittion to skills, relentlessness and grind, this is also about strategy and competition mentality.

I've been doing some weird memory allocation optimization.

Powers of 2 are important when caring about milliseconds.

# Separate diary
Oona Jokela taitaa olla menetetty tapaus.

Mutta toi Kaisan ystävä Helmi oli todella mukava ja söpö. Pitäisikö asialle tehdä jotain?



We might be close to the theoretical maximum with 1.01s.
I think it is time to move to the next problem. If someone beats us, we
can then come back to CP3ab.




# Is4

So we calculate 8 at a time.

 
error = sum (outer[c]^2 + inner[c]^2) - 2 * (outer[c] * color(y, x, c) + inner[c] * color(y, x, c)) + sum(color(y, x, c)^2) + sum(color(y, x, c))
       = outer_sum[c] * outer_sum[c] / (outer_size * outer_size) + inner_sum[c] * inner_sum[c] / (inner_size * inner_size) - 2 * (outer_sum[c] / outer_size * )

 Okay let's just first write down all ideas:
  - fix many threads race condition with omp pragmas?
      - might be other solutions as well. For example accumulating separate results for each thread.
  - We are going through each pair of lengths
      - and then each rectangle of those dimensions.
       - Any chance for cache blocking?
       - It feels like there is semi-automatic cache blocking as we travel through the rectangles.
  - Vector registers are of course something we should utilise.
      - I'm thinking about the c = 3. Should we "unroll" that?
      - But unfortunately 8 isn't divisible by 3. So I guess we would do vectors per each color. So like data[ROWS][VECTORS_PER_ROW][C = 3]; or then column direction vectors. We can try both.
                        

## Ideas after getting row vectors implementation to work:
- So we got 1.875s

- Handle the x1 > x case separately so we avoid if-statements in the hottest loop.
- Do the best error updates in the hot loop with vectors. Now we are wasting compute.
- 

## During flight
- Now we have 0.817s on our laptop.


Be brave. Lose your ego. Like Marty Supreme.



##
TODO:
- Optimize is4, then do is6a. And also do is6b. That is the goal for tomorrow.


