import { initials } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";



export const buildAvatar = (name: string) => () => {
    return createAvatar(initials, {
        seed: name,
        radius: 50,
        size: 50,
        backgroundType: ["gradientLinear"]
    }).toDataUriSync();

}