[Live][live]

[live]: drransom.github.io/changeMachine

Making Change
=============
This is a project I created for an employer coding challenge. The instructions
were quite simple: create a "change machine" that given an amount of money will
find the correct way to convert it into standard American bills and coins
using the smallest number of coins/bills. Assume the change machine has an
infinite supply of bills.

I decided to make the UI a simple web page so that I would have something
the employer could easily interact with. I set up a general three-object schema:
one controller object that calculated the change and interacted with the views,
and two views, one for the input form and one for the answer display. Since
this is a small app that exists only for demonstration purposes, I took the quick and
dirty approach of directly editing `Element.innerHTML` to move elements on and
off the page.

I avoided any third-party libraries since the project did not require them.

Elements of the Problem
========================

There are change-making problems with prime-numbered coins, and those can be
pretty pathological, but American coins and bills are easy to make change with,
so that part of the problem was trivial. The main problems I ran into were:

* Change machine has to handle an "infinite" amount of money.
* Change machine has to handle invalid user input.

If you measure by number of digits, 2^32-1 is not very large, and it's very easy
for a user to enter a much larger number. So the "obvious" approach of using modular
arithmetic to calculate the change breaks down quite rapidly. However, this particular
problem is amenable to a much easier solution: the number of hundred dollar bills
required is simply the string representation of the nuber of pennies except for the
last four characters. Or, in other words. `digits.substring(0, digits.length - 4)`.

I chose to avoid the invalid user input issue by having the app reformat
the user input on the fly. The `InputArea` parses user input on `change` event,
ignores any invalid characters, and automatically reformats it into a standard
numerical format with commas and two digits after the period.
