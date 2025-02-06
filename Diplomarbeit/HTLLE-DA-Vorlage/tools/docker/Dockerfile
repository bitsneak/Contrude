FROM ubuntu:22.04

# Set the environment variables
ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    DEBIAN_FRONTEND=noninteractive

# Update the package list and install dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    git \
    build-essential \
    make \
    texlive-full \
    pandoc \
    pandoc-citeproc \
    tree \
    rsync \
    hunspell \
    hunspell-de-at \
    hunspell-en-us && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /workspace

# Copy the Diplomarbeit template repository clone command here
# Uncomment the following line if the repository URL is provided
# RUN git clone https://itsp.htl-leoben.at/git/Hg/HTLLE-DA-Vorlage.git /workspace/template

# Set entrypoint to bash
ENTRYPOINT ["make", "pdf", "-C", "HTLLE-DA-Vorlage", "SOURCEDIR=/workspace"]
