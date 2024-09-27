import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
    try {
        // Step 1: Attempt to connect to the database
        await connectToDB();
        console.log("Database connected successfully");

        // Return a response after successful connection
        // return new Response(JSON.stringify({ message: "Database connected" }), {
        //     status: 200,
        //     headers: { 'Content-Type': 'application/json' }
        // });

        // Step 2: Attempt to fetch prompts
        const prompts = await Prompt.find({});


        // Return a response after fetching prompts (without populate)
        // return new Response(JSON.stringify({ count: prompts.length }), {
        //     status: 200,
        //     headers: { 'Content-Type': 'application/json' }
        // });

        // Step 3: Attempt to populate creator
        const populatedPrompts = await Prompt.find({}).populate('creator'); 

        // Final response with populated prompts
        return new Response(JSON.stringify(populatedPrompts), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Error in GET /api/prompt:", error);
        return new Response(JSON.stringify({ error: error.message }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}