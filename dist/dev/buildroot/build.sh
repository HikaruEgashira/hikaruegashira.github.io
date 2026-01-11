#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

IMAGES=../libs/v86/images
OUT_ROOTFS_TAR="$IMAGES"/alpine-rootfs.tar
OUT_ROOTFS_FLAT="$IMAGES"/alpine-rootfs-flat
OUT_FSJSON="$IMAGES"/alpine-fs.json
CONTAINER_NAME=alpine-v86
IMAGE_NAME=i386/alpine-v86

mkdir -p "$IMAGES"

echo "Building Docker image..."
docker build . --platform linux/386 --load --rm --tag "$IMAGE_NAME"

echo "Creating container..."
docker rm "$CONTAINER_NAME" 2>/dev/null || true
docker create --platform linux/386 -t -i --name "$CONTAINER_NAME" "$IMAGE_NAME"

echo "Exporting filesystem..."
docker export "$CONTAINER_NAME" -o "$OUT_ROOTFS_TAR"
tar -f "$OUT_ROOTFS_TAR" --delete ".dockerenv" || true

echo "Creating fs.json..."
python3 ./fs2json.py --out "$OUT_FSJSON" "$OUT_ROOTFS_TAR"

echo "Creating flat files..."
rm -rf "$OUT_ROOTFS_FLAT"
mkdir -p "$OUT_ROOTFS_FLAT"
python3 ./copy-to-sha256.py "$OUT_ROOTFS_TAR" "$OUT_ROOTFS_FLAT"

docker rm "$CONTAINER_NAME"

echo "Done!"
ls -lh "$IMAGES"
