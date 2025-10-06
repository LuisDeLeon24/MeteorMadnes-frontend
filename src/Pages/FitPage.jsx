// src/Pages/FitPage.jsx
import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import LeftBar from "../components/FitPage/LeftBar";
import RightBar from "../components/FitPage/RightBar";

const FitPage = () => {
    const nrois = [2, 1];

    return (
        <Flex
            direction={{ base: "column", md: "row" }}
            minH="100vh"
            gap={4}
            p={4}
            bg="linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)"
        >
            {/* LEFT BAR */}
            <LeftBar />

            {/* CENTER */}
            <Box
                flex={1}
                minW={{ base: "100%", md: "617px" }}
                h="617px"
                p={2}
                border="2px solid #0ea5e9"
                borderRadius="lg"
                boxShadow="0 10px 40px rgba(14, 165, 233, 0.3)"
                bg="linear-gradient(135deg, #0f172a, #1e293b)"
                overflow="scroll"
            >
                {/* Canvas FITS principal */}
            </Box>

            {/* RIGHT BAR */}
            <RightBar nrois={nrois} />
        </Flex>
    );
};

export default FitPage;
