#!/bin/bash

set -e

if [ ! -e transformers ]; then
  git clone https://github.com/huggingface/transformers  # tested at 26db31e0c09a8b5e1ca7a61c454b159eab9d86be
fi
if [ ! -e venv ] ; then
   virtualenv -ppython3 venv
fi
source venv/bin/activate
cd transformers
pip install -e .
pip install -r examples/requirements.txt
pip install torch tensorflow

python examples/run_generation.py  --model_type gpt2 --model_name_or_path gpt2 \
       --prompt "Go ahead and install a model please, then"

cd ..
npm install
