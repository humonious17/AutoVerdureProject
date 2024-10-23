import {EmailTemplate} from "@/components/emailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
    try {
        const { data, error } = resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['server.autoverdure@gmail.com'],
            subject: 'Test',
            react: EmailTemplate({firstName: 'Raghav'})
        })

        if (error) {
            throw error;
        } else {
            return res.status(200).json({data: data});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Something went wrong'});
    }
}