function normalizeRotation(rotation) {
    return ((rotation % 360) + 360) % 360;
}

export function getPdfThumbnailPreviewState(baseOrientation, rotation, visualRotation = rotation) {
    const normalizedRotation = normalizeRotation(rotation);
    const rotationSwapsOrientation = normalizedRotation === 90 || normalizedRotation === 270;
    const isLandscapeBase = baseOrientation === 'landscape';

    let pageOrientation = 'portrait';

    if (isLandscapeBase) {
        pageOrientation = rotationSwapsOrientation ? 'portrait' : 'landscape';
    } else if (baseOrientation === 'portrait') {
        pageOrientation = rotationSwapsOrientation ? 'landscape' : 'portrait';
    }

    const shellRotation = visualRotation + (isLandscapeBase ? 90 : 0);
    const contentRotation = isLandscapeBase ? -90 : 0;

    return {
        pageOrientation,
        shellRotation,
        contentRotation,
        isSideways: isLandscapeBase
    };
}
