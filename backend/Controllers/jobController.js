import { companyModel } from "../Model/companyModel.js";
import { jobModel } from "../Model/jobModel.js";
// admin
export const postJob = async (req, res) => {
    try {
        const { title, description, requirement, salary, location, jobType, experience, position, companyId } = req.body;
        // console.log(title, description, requirement, salary, location, jobType, experience, position, companyId)
        if (!title || !description || !requirement || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing",
                status: false,
            })
        }
        const userId = req.id;
        const job = await jobModel.create({
            title, description, requirements: requirement.split(",")
            , salary: Number(salary),
            location, jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId

        })
        return res.status(201).json({
            message: "New job created successfully",
            success: true,
            job
        })


    } catch (error) {
        console.log(error)
    }
}
// student
export const allJob = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },

            ]
        };

        const jobs = await jobModel.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(400).json({
                message: "jobs not found",
                success: false
            })
        };

        return res.status(200).json({
            jobs, success: true
        })

    } catch (error) {
        console.log(error)
    }
}


// student
export const getJobById = async (req, res) => {

    try {
        const jobId = req.params.id;

        const job = await jobModel.findById(jobId).populate({
            path: "applications", // Populate applications field in the Job model
            populate: {
                path: "applicant", // Populate applicant field in the Application model
                // Explicitly reference the User model
            },
        }
        )

        if (!job) {
            return res.status(400).json({
                message: "job not found",
                success: false
            })
        };

        return res.status(200).json({
            job, success: true
        })
    } catch (error) {
        console.log(error)
    }
}

//  how many created by admin

export const getJobByAdminId = async (req, res) => {
    try {
        const adminId = req.id;


        const jobs = await jobModel.find({ created_by: adminId }).populate({
            path: "company",
        })

        if (!jobs) {
            return res.status(400).json({
                message: "jobs not found",
                success: false
            })
        };

        return res.status(200).json({
            jobs, success: true
        })
    } catch (error) {
        console.log(error)
    }

}
export const getJobDeleteByAdminId = async (req, res) => {
    try {
        const adminId = req.id; // Assuming req.id contains the admin ID
        // console.log("Admin ID:", adminId);

        const { jobId } = req.body; // Extract jobId from the request body
        // console.log("Job ID to delete:", jobId);

        // Find and delete the job by ID
        const job = await jobModel.findByIdAndDelete(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Job deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting job:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
