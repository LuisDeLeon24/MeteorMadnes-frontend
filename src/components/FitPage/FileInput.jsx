import React, { useRef, useState } from "react";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { Upload } from "lucide-react";

const FileInput = ({ fits }) => {
    const inputRef = useRef();
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file || !fits) return;

        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (event) => {
            const ab = event.target.result; // ArrayBuffer
            try {
                fits.setNewImage(file.name, ab);
                fits.showHeader(false);
            } catch (err) {
                alert(err);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <VStack spacing={2} align="start" w="full">
            <input
                ref={inputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
            <Button
                onClick={() => inputRef.current.click()}
                bg="linear-gradient(135deg, #0ea5e9, #3b82f6)"
                color="white"
                _hover={{ bg: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                borderRadius="2xl"
                w="full"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                px={6}
                boxShadow="0 0 10px #0ea5e9"
            >
                <Text noOfLines={1} overflow="hidden" textOverflow="ellipsis">
                    {fileName || "Select files"}
                </Text>
                <Upload size={18} />
            </Button>
            <Box
                p={3}
                borderRadius="lg"
                bg="#1b1c35"
                w="full"
                minH="40px"
                color="#0ea5e9"
                fontSize="sm"
                boxShadow="inset 0 0 5px #0ea5e9"
            >
                {fileName
                    ? `File: ${fileName}`
                    : "The name of the selected file will be shown here"}
            </Box>
        </VStack>
    );
};

export default FileInput;