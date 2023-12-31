import { PineconeClient } from "@pinecone-database/pinecone"; 
import { downloadFromS3 } from "./s3-server";
import {PDFLoader} from "langchain/document_loaders/fs/pdf";

let pinecone: PineconeClient | null = null;


export const getPineconeClient = async () => {
    if(!pinecone) {
        pinecone = new PineconeClient();
        await pinecone.init({
            environment: process.env.PINECONE_ENVIRONMENT!,
            apiKey: process.env.PINECONE_API_KEY!,

        });
    }
    return pinecone;
};

type PDFPage = {
    pageContent: string;
    metadata: {
        loc: { pageNumber: number };
    };
};

export async function loadS3IntoPinecone(fileKey: string) {
    // 1. obtain the pdf -> download and read from pdf
    console.log('downloading s3 into the file system');
    const file_name = await downloadFromS3(fileKey);
    if(!file_name){ 
        throw new Error("could not load from S3");
    }
    const loader = new PDFLoader(file_name);
    const pages = await loader.load();
    return pages;
}