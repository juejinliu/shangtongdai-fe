#!/bin/bash

webpack -p

scp -r build/* root@10.100.67.174:/data/shangtongdai/shangtongdai-fe/h5/
