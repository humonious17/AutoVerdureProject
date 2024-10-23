import {EmailTemplate} from "@/components/contactEmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

async function sendContactMail(details) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['server.autoverdure@gmail.com'],
            subject: `Query from ${details.email}`,
            react: EmailTemplate({firstName: details.firstName, lastName: details.lastName, email: details.email, queryType: details.queryType, comments: details.comments})
        })

        if (error) {
            throw error;
        } else {
            return data;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default async function handler (req, res) {
    if (req.method === 'POST') {
        const {data} = req.body;

        if (!data) {
            return res.status(400).json({error:'No data received'})
        }

        const result = await sendContactMail(data);
        
        if (result) {
            return res.status(200).json({data: result}); 
        } else {
            return res.status(500).json({message: 'Something went wrong, check server logs.'});
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return ;
    }
}