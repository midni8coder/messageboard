
/****** Object:  StoredProcedure [dbo].[usp_UpdateUser]    Script Date: 09/29/21 12:39:22 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[usp_UpdateUser]
GO

/****** Object:  StoredProcedure [dbo].[usp_UpdateUser]    Script Date: 09/29/21 12:39:22 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


create proc [dbo].[usp_UpdateUser](
	@UserName varchar(500),
	@Email varchar(500),
	@UserId int
)
as
begin
	update [User] 
	set UserName =@UserName, Email=@Email
	where UserId = @UserId

	select * from [User]  where UserId = @UserId
end
GO


