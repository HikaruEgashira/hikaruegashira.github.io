FROM docker.io/i386/alpine:3.21.0

ENV KERNEL=virt

RUN apk add openrc alpine-base agetty alpine-conf linux-$KERNEL linux-firmware-none

RUN sed -i 's/getty 38400 tty1/agetty --autologin root tty1 linux/' /etc/inittab
RUN echo 'ttyS0::respawn:/sbin/agetty --autologin root -s ttyS0 115200 vt100' >> /etc/inittab
RUN echo "root:" | chpasswd

RUN setup-hostname localhost

RUN for i in devfs dmesg mdev hwdrivers; do rc-update add $i sysinit; done
RUN for i in hwclock modules sysctl hostname; do rc-update add $i boot; done
RUN rc-update add killprocs shutdown

RUN echo 'export PS1="~ % "' > /etc/profile.d/prompt.sh
RUN : > /etc/motd
RUN : > /etc/issue
RUN mkdir -p /var/log && touch /var/log/wtmp /var/log/lastlog

RUN mkinitfs -F "base virtio 9p" $(cat /usr/share/kernel/$KERNEL/kernel.release)

# Pleno scripts
RUN mkdir -p /root
RUN printf '#!/bin/sh\nprintf "\\033]1337;open=https://plenoai.com/pleno-audit/\\007"\n' > /root/pleno-audit && chmod +x /root/pleno-audit
RUN printf '#!/bin/sh\nprintf "\\033]1337;open=https://plenoai.com/pleno-anonymize/\\007"\n' > /root/pleno-anonymize && chmod +x /root/pleno-anonymize
RUN printf '#!/bin/sh\nprintf "\\033]1337;open=https://plenoai.com/pleno-transcribe/\\007"\n' > /root/pleno-transcribe && chmod +x /root/pleno-transcribe
