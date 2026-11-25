import { useRef, useState } from "react";
import { Box, Button, Text, Stack } from "@chakra-ui/react";
import { Upload } from "lucide-react";
import { palette } from "../../theme";

const FileInput = ({ fits }) => {
  const inputRef = useRef();
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file || !fits) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const ab = event.target.result;
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
    <Stack spacing={2} align="stretch" w="full">
      <Text as="label" htmlFor="fits-file" fontSize="13px" color={palette.quiet}>
        FITS file
      </Text>
      <input
        id="fits-file"
        ref={inputRef}
        type="file"
        name="fits"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Button
        onClick={() => inputRef.current.click()}
        variant="outline"
        w="full"
        justifyContent="space-between"
        h="40px"
        px={3}
        fontWeight={400}
      >
        <Text noOfLines={1} overflow="hidden" textOverflow="ellipsis">
          {fileName || "Select a file"}
        </Text>
        <Upload size={16} aria-hidden="true" />
      </Button>
      <Box
        px={3}
        py={2}
        borderRadius="8px"
        border="1px solid"
        borderColor={palette.line}
        bg={palette.ink}
        minH="40px"
        color={palette.quiet}
        fontSize="13px"
      >
        {fileName ? `File: ${fileName}` : "The selected file name appears here."}
      </Box>
    </Stack>
  );
};

export default FileInput;
