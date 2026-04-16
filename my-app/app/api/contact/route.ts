import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const {
			fullName,
			phone,
			vesselInfo,
			boatSize,
			vesselLocation,
			services,
			message,
		} = body;

		await resend.emails.send({
			from: "Black Tide Detailing <noreply@blacktidedetailingnj.com>",
			to: "blacktidedetailingnj@gmail.com",
			subject: `New Inquiry from ${fullName}`,
			html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #18B6E6; margin-bottom: 24px;">New Service Request</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 40%;">Full Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Vessel</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${vesselInfo}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Boat Length</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${boatSize}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Vessel Location</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${vesselLocation}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Services Requested</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${services.join(", ")}</td>
            </tr>
            ${
							message
								? `
            <tr>
              <td style="padding: 10px 0; font-weight: bold;">Additional Notes</td>
              <td style="padding: 10px 0;">${message}</td>
            </tr>
            `
								: ""
						}
          </table>
        </div>
      `,
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Email send error:", error);
		return NextResponse.json(
			{ error: "Failed to send email" },
			{ status: 500 },
		);
	}
}
