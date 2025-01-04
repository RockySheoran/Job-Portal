import { applicationModel } from "../Model/applicationModel.js";
import { jobModel } from "../Model/jobModel.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: 'job id is  require',
                success: false,
            })
        }
        //  check the user is  not applied already
        const existingApplication = await applicationModel.findOne({ job: jobId, applicant: userId });
        // console.log(existingApplication, "dd")
        if (existingApplication) {
            return res.status(400).json({
                message: "you have already applied for this job",
                success: false,
            })
        }
        // check if the job is exits

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
                success: false,
            })
        }
        // create new application
        const newApplicant = await applicationModel.create({
            job: jobId,
            applicant: userId,
        })

        job.applications.push(newApplicant._id);

        await job.save();

        return res.status(201).json({
            message: "job applied successfully",
            success: true,
            job,

        })

    } catch (error) {
        console.log(error)
    }
}

export const getAppliedJob = async (req, res) => {
    try {
        const userId = req.id;
        const application = await applicationModel.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }
        })
        if (!application) {
            return res.status(404).json({
                message: "no application",
                status: false,
            })
        }
        return res.status(200).json({
            application,
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}

// admin will see how many p

export const getApplicant = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await jobModel.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant",
            }
        })

        if (!job) {
            return res.status(400).json({
                message: "job not found",
                success: false,
            })
        }
        return res.status(200).json({
            job,
            success: true,
        }
        )
    }
    catch (e) {
        console.log(e)
    }
}


export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: "status is required",
                success: false,
            })
        }

        // find the application find
        const application = await applicationModel.findOne({ _id: applicationId });
        if (!application) {
            return res.status(400).json({
                message: "application not found",
                success: false,
            })
        }
        // update status

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "status updated successfully",
            success: true,
        })
    } catch (error) {
        console.log(error)
    }
}