import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
	try {
		const fd = await req.formData();
		const fullName = fd.get("fullName") as string;
		const phone = fd.get("phone") as string;
		const vesselInfo = fd.get("vesselInfo") as string;
		const boatSize = fd.get("boatSize") as string;
		const vesselLocation = fd.get("vesselLocation") as string;
		const services: string[] = JSON.parse(fd.get("services") as string);
		const message = (fd.get("message") as string) || "";
		const imageFile = fd.get("boatImage") as File | null;

		let imageHtml = "";
		let attachments: {
			filename: string;
			content: Buffer;
			contentType: string;
			contentDisposition: "inline";
			contentId: string;
		}[] = [];

		if (imageFile && imageFile.size > 0) {
			const buffer = await imageFile.arrayBuffer();
			const imageBuffer = Buffer.from(buffer);
			const mime = imageFile.type || "image/jpeg";
			const filename = imageFile.name || "vessel.jpg";

			attachments = [
				{
					filename,
					content: imageBuffer,
					contentType: mime,
					contentDisposition: "inline",
					contentId: "vesselphoto",
				},
			];

			imageHtml = `
				<tr>
					<td colspan="2" style="padding: 20px 0 4px;">
						<p style="color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 10px;">Vessel Photo</p>
						<img src="cid:vesselphoto" alt="Vessel photo" style="width: 100%; max-width: 540px; border-radius: 8px; display: block;" />
					</td>
				</tr>
			`;
		}

		await resend.emails.send({
			from: "Black Tide Detailing <noreply@blacktidedetailingnj.com>",
			to: "blacktidedetailingnj@gmail.com",
			subject: `New Inquiry from ${fullName}`,
			attachments,
			html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #1e1e1e !important; border-radius: 12px; overflow: hidden; border: 1px solid #333333;">

          <div style="background: #0d1f3c !important; padding: 24px 28px;">
            <p style="color: #18B6E6; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 4px;">Black Tide Detailing NJ</p>
            <p style="color: #ffffff; font-size: 20px; font-weight: 600; margin: 0;">New Service Request</p>
          </div>

          <div style="padding: 24px 28px; background: #1e1e1e !important;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #2e2e2e;">
                <td style="padding: 10px 0; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; width: 40%;">Full Name</td>
                <td style="padding: 10px 0; color: #ffffff; font-weight: 500;">${fullName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #2e2e2e;">
                <td style="padding: 10px 0; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;">Phone</td>
                <td style="padding: 10px 0; color: #ffffff; font-weight: 500;">${phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #2e2e2e;">
                <td style="padding: 10px 0; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;">Vessel</td>
                <td style="padding: 10px 0; color: #ffffff; font-weight: 500;">${vesselInfo}</td>
              </tr>
              <tr style="border-bottom: 1px solid #2e2e2e;">
                <td style="padding: 10px 0; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;">Boat Length</td>
                <td style="padding: 10px 0; color: #ffffff; font-weight: 500;">${boatSize}</td>
              </tr>
              <tr style="border-bottom: 1px solid #2e2e2e;">
                <td style="padding: 10px 0; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;">Vessel Location</td>
                <td style="padding: 10px 0; color: #ffffff; font-weight: 500;">${vesselLocation}</td>
              </tr>
              <tr style="${message ? "border-bottom: 1px solid #2e2e2e;" : ""}">
                <td style="padding: 10px 0; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;">Services</td>
                <td style="padding: 10px 0; color: #ffffff; font-weight: 500;">${services.join(", ")}</td>
              </tr>
              ${
								message
									? `
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;">Notes</td>
                <td style="padding: 10px 0; color: #ffffff; font-weight: 500;">${message}</td>
              </tr>
              `
									: ""
							}
            </table>
            <table style="width: 100%; border-collapse: collapse;">${imageHtml}</table>
          </div>

          <div style="background: #161616 !important; padding: 16px 28px; border-top: 1px solid #2e2e2e;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">Sent from blacktidedetailingnj.com &middot; noreply@blacktidedetailingnj.com</p>
          </div>

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
