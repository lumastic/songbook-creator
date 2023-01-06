#!/bin/bash
if [ $# -eq 0 ]; then
    echo "No arguments provided"
    exit 1
fi

path=../app/components/$1
lower=`echo $1 | tr '[:upper:]' '[:lower:]'`
mkdir -p $path

touch $path/$1.stories.tsx
sed -e "s/COMPONENT_NAME/$1/g" ./snippets/Snippet.stories.tsx > $path/$1.stories.tsx

touch $path/$1.test.tsx
sed -e "s/COMPONENT_NAME/$1/g" -e "s/component_name/$lower/g" ./snippets/Snippet.test.tsx > $path/$1.test.tsx

touch $path/$1.tsx
sed -e "s/COMPONENT_NAME/$1/g" -e "s/component_name/$lower/g" ./snippets/Snippet.tsx > $path/$1.tsx

touch $path/index.ts
sed -e "s/COMPONENT_NAME/$1/g" ./snippets/index.ts > $path/index.ts