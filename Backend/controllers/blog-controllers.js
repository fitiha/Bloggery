import blogModel from "../models/blogModel.js";
import commentModel from "../models/commentModel.js";
import likeModel from "../models/likeModel.js";

export const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await blogModel.find().populate('userId', 'avatar');
        if (!blogs)
            return res.status(404).json({ message: "No blogs found" });
        else
            res.status(200).json({ blogs });
    } catch (error) {
        res.send(error);
    }
}

export const getBlogById = async (req, res, next) => {
    try {
        const blog = await blogModel.findById(req.params.id);
        if (!blog)
            return res.status(404).json({ message: "No blog found" });
        else
            res.status(200).json({ blog });
    } catch (error) {
        res.send(error);
    }
}

export const updateBlog = async (req, res, next) => {
    try {
        const blog = await blogModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blog)
            return res.status(404).json({ message: "Can't find a blog." });
        else
            res.status(200).json({ blog });
    } catch (error) {
        res.send(error);
    }
}

export const deleteBlog = async (req, res, next) => {
    try {
        const blog = await blogModel.findByIdAndDelete(req.params.id);
        if (!blog)
            return res.status(404).json({ message: "No blog found" });
        else
            res.status(200).json({ blog });
    } catch (error) {
        res.send(error);
    }
}

export const clearBlogs = async (req, res, next) => {
    try {
        await blogModel.deleteMany();
        await likeModel.deleteMany();
        res.status(200).json({ message: "All blogs deleted successfully" });
    } catch (error) {
        res.send(error);
    }
}

export const clearComments = async (req, res, next) => {
    try {
        await commentModel.deleteMany();
        res.status(200).json({ message: "All comments deleted successfully" })
    } catch (err) {
        res.json({ error: err })
    }
}

export const getBlogByUserId = async (req, res, next) => {
    try {
        const blog = await blogModel.find({ userId: req.params.id });
        if (!blog)
            return res.status(404).json({ message: "No blog found" });
        else
            res.status(200).json({ blog });
    } catch (error) {
        res.send(error);
    }
}


// Like Controller
export const getAllLikes = async (req, res, next) => {
    try {
        const likes = await likeModel.find();
        if (!likes)
            return res.status(404).json({ message: "No likes found" });
        else
            res.status(200).json({ likes });
    } catch (error) {
        res.send(error);
    }
}

export const getBlogLikes = async (req, res, next) => {
    try {
        const likes = await likeModel.find({ blogId: req.params.id });
        if (!likes)
            return res.status(404).json({ message: "No likes found" });
        else
            res.status(200).json({ likes });
    } catch (error) {
        res.send(error);
    }
}



//related with the comments
export const getAllComments = async (req, res, next) => {
    try {
        const allComments = await commentModel.find().populate('userId', 'name avatar').populate('replies.userId', 'name avatar').exec();
        res.json({ allComments: allComments });
    }
    catch (err) {
        res.json({ message: err });
    }
}


// export const generatePdf = async (req, res, next) => {
//     const { pageUrl } = req.query; // Assume the front end sends the page URL as a query parameter

//     if (!pageUrl) {
//         return res.status(400).send('Page URL is required');
//     }

//     try {
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
//         await page.goto(pageUrl, { waitUntil: 'networkidle0' });

//         // Optionally, remove parts of the page
//         await page.evaluate(() => {
//             document.querySelectorAll('.remove-for-pdf').forEach(element => element.remove());
//             // Add any other transformations here
//         });

//         const pdfBuffer = await page.pdf({ format: 'A4' });

//         await browser.close();

//         // Send the PDF back to the client
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', 'attachment; filename="blog-post.pdf"');
//         res.send(pdfBuffer);
//     } catch (error) {
//         console.error('Error generating PDF:', error);
//         res.status(500).send('Failed to generate PDF');
//     }
// }