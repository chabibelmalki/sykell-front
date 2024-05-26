import { Button, Container, Grid, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { processUrlAnalyzer } from '../../service/urlAnalyzer/urlAnalyzer'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid';
import URLTable from '../../components/Table/URLTable'
import axios from 'axios'

const Home = () => {
    const [url, setURL] = useState("");
    const [urlsData, setUrlsData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    // add url to the list if not existed
    const submitUrl = async () => {
        const urlExists = urlsData.some((urlData) => urlData.link === url);

        if (!urlExists) {
            const id = uuidv4();

            // Add url
            setUrlsData((prevData) => [{ id, link: url, isPending: false }, ...prevData]);
            setURL("");
        } else {
            toast.warn("URL already exists on the list")
        }
    };

    // process all the selected URLs
    const processUrl = async () => {
        try {
            // Create an array of promises for processing each URL
            const promises = selectedRows.map(async (rowId) => {
                const urlData = urlsData.find((url) => url.id === rowId);

                //get axios cancel token
                const source = axios.CancelToken.source();

                if (urlData && !urlData.isPending) {
                    const id = urlData.id;
                    // Update isPending to True
                    setUrlsData((prevData) => {
                        const newData = prevData.map((item) => {
                            if (item.id === id) {
                                return { ...item, cancelToken: source, isPending: true };
                            }
                            return item;
                        });
                        return newData;
                    });

                    const data = { "url": urlData.link };

                    try {
                        const response = await processUrlAnalyzer(data, source.token);

                        // Update data after processing
                        setUrlsData((prevData) => {
                            const newData = prevData.map((item) => {
                                if (item.id === id) {
                                    return { ...item, details: response.data, isPending: false };
                                }
                                return item;
                            });
                            return newData;
                        });
                    } catch (error) {
                        toast.error(error.message);
                    }
                }

            });

            // Wait for all promises to resolve
            await Promise.all(promises);
            setSelectedRows([]);
        } catch (error) {
            // Handle any other errors here
            console.error("An error occurred:", error);
        }
    };

    // cancel all selected URL
    const cancelSelectedUrlProcessing = async () => {
        const promises = selectedRows.map(async (rowId) => {
            cancelUrlProcessing(rowId);
        });

        // Wait for all promises to resolve
        await Promise.all(promises);
        setSelectedRows([]);
    }

    // cancel URL by Id
    const cancelUrlProcessing = async (id) => {
        const url = urlsData.find((item) => item.id === id);
        if (url && url.isPending) {
            url?.cancelToken?.cancel(`Operation canceled for request ${url.link}`);

            // Update data after processing
            setUrlsData((prevData) => {
                const newData = prevData.map((item) => {
                    if (item.id === id) {
                        return { ...item, isPending: false };
                    }
                    return item;
                });
                return newData;
            });
        }
    }

    return (
        <div>
            <Layout>

                <Container
                    sx={{
                        bgcolor: 'white',
                        p: 4,
                        boxShadow: 1,
                        borderRadius: 1,
                        textAlign: 'center',
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Enter some URL"
                                value={url}
                                onChange={(event) => setURL(event.target.value)}
                                sx={{ mb: 2 }}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Stack direction="row" spacing={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => submitUrl()}
                                    disabled={!url}
                                >
                                    add URL
                                </Button>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => processUrl()}
                                    disabled={!selectedRows || selectedRows.length === 0}
                                >
                                    analyze
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => cancelSelectedUrlProcessing()}
                                    disabled={!selectedRows || selectedRows.length === 0}
                                >
                                    stop
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                    <URLTable rows={urlsData} cancelFunction={cancelUrlProcessing} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />

                </Container>
            </Layout>

        </div>
    )
}

export default Home