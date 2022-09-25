FROM public.ecr.aws/lambda/nodejs:16 as builder


WORKDIR /usr/app
COPY package.json tsconfig.json  ./
COPY src ./src
RUN npm install
RUN npm run build


FROM public.ecr.aws/lambda/nodejs:16
WORKDIR ${LAMBDA_TASK_ROOT}

# RUN yum install alsa-lib.x86_64 -y
# RUN yum install atk.x86_64 -y
# RUN yum install cups-libs.x86_64 -y
# RUN yum install gtk3.x86_64 -y
# RUN yum install ipa-gothic-fonts -y
# RUN yum install libXcomposite.x86_64 -y
# RUN yum install libXcursor.x86_64 -y
# RUN yum install libXdamage.x86_64 -y
# RUN yum install libXext.x86_64 -y
# RUN yum install libXi.x86_64 -y
# RUN yum install libXrandr.x86_64 -y
# RUN yum install libXScrnSaver.x86_64 -y
# RUN yum install libXtst.x86_64 -y
# RUN yum install pango.x86_64 -y
# RUN yum install xorg-x11-fonts-100dpi -y
# RUN yum install xorg-x11-fonts-75dpi -y
# RUN yum install xorg-x11-fonts-cyrillic -y
# RUN yum install xorg-x11-fonts-misc -y
# RUN yum install xorg-x11-fonts-Type1 -y
# RUN yum install xorg-x11-utils -y
# RUN yum update nss -y

# COPY google-chrome.repo /etc/yum.repos.d/
# RUN yum upgrade -y
# RUN yum install google-chrome-stable -y


COPY --from=builder /usr/app/dist/* ./
RUN mkdir ./node_modules
COPY --from=builder /usr/app/node_modules ./node_modules
CMD ["index.handler"]
