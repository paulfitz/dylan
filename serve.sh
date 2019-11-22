#!/bin/bash

if [ ! -e venv ]; then
  echo "Please run ./setup.sh first"
  exit 1
fi

source venv/bin/activate
python src/generation_server.py  --model_type gpt2 --model_name_or_path gpt2
