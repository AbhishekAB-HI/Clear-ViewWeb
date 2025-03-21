import { IAdminServices } from "../Interface/Admin/AdminServises";
import { Request, Response } from "express";

class AdminController {
  constructor(private adminservises: IAdminServices) {}

  async adminLogin(req: Request, res: Response): Promise<void> {
    try {

      const userData = req.body;
      let userdata = await this.adminservises.verifyUser(userData);
      if (userdata) {
        let AdminTocken = userdata.admintocken;
        res
          .status(200)
          .json({ message: "adminLogin succesfully", AdminTocken });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        if (error.message === "user not found") {
          res.status(409).json({ message: error.message });
        }
        if (error.message) {
          res.status(400).json({ message: error.message });
        }
      }
    }
  }

  async getalldetails(req: Request, res: Response) {
    try {
      let userdata = await this.adminservises.getpostAnduserdetails();
      res
        .status(200)
        .json({ message: "user and post data get succesfull", userdata });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        if (error.message === "No users found") {
          res.status(409).json({ message: error.message });
        }
        if (error.message) {
          res.status(400).json({ message: error.message });
        }
      }
    }
  }

  async adminHomePage(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 2;
      const search = req.query.search as string | undefined;
      let userdata = await this.adminservises.getUserdetails(
        page,
        limit,
        search
      );

      const response = {
        message: "user data get succesfull",
        userinfo: userdata?.userinfo || [],
        userscount: userdata?.userscount || 0,
      };

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        if (error.message === "No users found") {
          res.status(409).json({ message: error.message });
        }
        if (error.message) {
          res.status(400).json({ message: error.message });
        }
      }
    }
  }

  async deleteReportPost(req: Request, res: Response) {
    try {
      const deleteId = req.query.id;
      const postId = req.query.postid;

      if (typeof deleteId !== "string" || typeof postId !== "string") {
        return res.status(400).json({ message: "Invalid ID or Post ID" });
      }

      await this.adminservises.deleteReportPost(deleteId, postId);
      res.status(200).json({ message: "delete post" });
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      const deleteId = req.params.id;
      await this.adminservises.deletePost(deleteId);
      res.status(200).json({ message: "delete post" });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllReportUsers(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string, 5) || 1;
      const limit = parseInt(req.query.limit as string, 4) || 4;
      const { search } = req.query;
      const foundusers = await this.adminservises.getAllReportUsers(
        page,
        limit,
        search
      );

      if (!foundusers?.Reports || !foundusers?.totalcount) {
        return res
          .status(200)
          .json({ message: "All user found", Reports: [], totalcount: 0 });
      }
      const { Reports, totalcount } = foundusers;
      res.status(200).json({ message: "All user found", Reports, totalcount });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllReportPost(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string, 5) || 1;
      const limit = parseInt(req.query.limit as string, 2) || 2;
      const { posts, total } = await this.adminservises.getAllReportedpost(
        page,
        limit
      );
      res.status(200).json({
        message: "All posts found",
        data: {
          posts,
          total,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getAllpost(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string, 5) || 1;
      const limit = parseInt(req.query.limit as string, 4) || 20;
      const { search } = req.query;
      const { posts, total } = await this.adminservises.getAllpost(
        page,
        limit,
        search
      );
      res.status(200).json({
        message: "All posts found",
        data: {
          posts,
          total,
          currentPage: page,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async handleBlocking(req: Request, res: Response) {
    try {
      const { userId, isActive } = req.body;
      let userdata = await this.adminservises.updateBlocking(userId, isActive);
      if (!userdata) {
        res.status(200).json({ message: "User is blocked" });
      } else {
        res.status(200).json({ message: "User is unblocked" });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default AdminController;
