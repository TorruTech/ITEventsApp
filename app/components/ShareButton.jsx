import React from "react";
import { Share, Pressable } from "react-native";
import { ShareIcon } from "./Icons";

// Incluir, además, del message, el link para que otro usuario con la app pueda acceder a un
// evento
const ShareButton = ({message, link = ""}) => {
    
    const handleShare = async () => {
        try {
            const result = await Share.share({
                message
            });

            if (result.action === Share.sharedAction) {
                console.log("Compartido exitosamente");
            } else if (result.action === Share.dismissedAction) {
                console.log("Compartir cancelado");
            }
        } catch (error) {
            console.error("Error al compartir:", error);
        }
    };

    return (
        <Pressable 
            onPress={handleShare} 
            style={({ pressed }) => [
                { opacity: pressed ? 0.5 : 1 } 
            ]}
        >
            <ShareIcon />
        </Pressable>
    );
};

export default ShareButton;
