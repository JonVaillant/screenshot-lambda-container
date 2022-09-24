FROM public.ecr.aws/lambda/nodejs:16 as builder


WORKDIR /usr/app
COPY package.json tsconfig.json index.ts  ./
RUN npm install
RUN npm run build


FROM public.ecr.aws/lambda/nodejs:16
WORKDIR ${LAMBDA_TASK_ROOT}

COPY google-chrome.repo /etc/yum.repos.d/
RUN yum upgrade -y
RUN yum install google-chrome-stable -y

COPY --from=builder /usr/app/dist/* ./
RUN mkdir ./node_modules
COPY --from=builder /usr/app/node_modules ./node_modules
CMD ["index.handler"]
