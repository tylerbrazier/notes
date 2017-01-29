#!/bin/bash

echo 'https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html'

echo
echo 'parameter expansion can be used to split strings.'
echo '% deletes from the end, # deletes from the beginning:'

str='abc,def'
echo "str = $str"

echo -n '${str%,*}: '
echo "${str%,*}" # abc

echo -n '${str#*,}: '
echo "${str#*,}" # def

echo
echo 'two %%/## strips the longest matching pattern'

str='abc,def,hij'
echo "str = $str"

echo -n '${str%%,*}: '
echo "${str%%,*}" # abc

echo -n '${str##*,}: '
echo "${str##*,}" # hij
