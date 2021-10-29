const { ApolloServer, gql } = require('apollo-server');

const blogServer = [
    {
        title: "Between the lines",
        author: "David Allen",
        id: 1,
        blogMessage:"hello, your blog is amazing",
        likes:20,
        unlikes: 10,
        comment: [{message: "This blog is great", reply: [{rep:"yes,it is nice. Thank You"}]}],
        banner: "image Source"



    },


    { 
      title: "Buzz, Balls and Hype",
      author: "M.J.Rose",
      id: 2,
      blogMessage:"can I get another beautiful story",
      likes:40, 
      unlikes:15,
      comment: [{message: "can I get more of your story", reply: [{rep:"Yes, you can"}]}],
      banner: "image Source" 


    }
];


   const  blogSchema = gql
     type blogServer {
         title: String!
         author: String!
         id: int!
         blogMessage:String
         likes:Int
         unlikes:Int
         comment: [comment]
         banner: string
         
     }
       
   
  type replied {
      rep: String
  }    



    type commented {
        message:String!
        reply: [reply]
     }


     type Query {
         blogServer:[blogServer]
         blogServer(title: String!): blogServer
     }

     type Mutation {
         createBlog(title: String!, author : String!, blogMessage:String!) : blogServer
         likeBlog(title: String!) :blogServer
         unlikeBlog(title : String!): blogServer
         updateBlog(
             title: String!,
             newTitle: String,
             author: String,
             blogMessage: String,
             banner:  String,
         );
         commentBlog ( title: String!, comment: String! ):blogServer
         deleteBlog( title: String!) : blogServer
         deleteCommentOnBlog(title: String!, comment: string!): blogServer
     };


     const blogResolver = {
         Query: {
             blogServer: () => blogServer,
             blog:(parent,args) => blogServer.find(blog => blog.title === args. title)
         },
         

         Mutation: {
             createBlog: (parent, arg) =>{
                 const{ title, author,blogMessage, } = args;
                 const blog ={title ,author,blogMessage, likes: 0,unlike: 0,comments:[] };
                 blogServer.push(blog);
                 return blog;
             },
             
             likeBlog:(parent, args) => {
                 const blog =blogServer.find (blog => blog.title === args.title)
                 blog.likes+=1
                 return blog;

             },
             unlikeBlog:(parent,args) => {
                const blog =blogServer.find (blog => blog.title === args.title)
                blog.likes+=1
                return blog;
                 
             },


             updateBlog: (parent,args) => {
                 const blog =blogServer.find(blog => blog.title === args.title)
                 if (blog){
                     blog.title =args.newTitle ? args.newTitle : args.title
                     blog.author = arg.author
                     blog.blogMessage =args.blogMessage
                     blog.banner = args.banner
                     return blog;

                 }else{
                     throw new Error("Blog is not found")
                 }
             },
            commentBlog: (parent, args )=> {
                const blog = blogServer.find(blog => blog.title === args.title)
                if (blog && args.comment ){
                    blog.comment.push({message: args.comments})
                    return blog;


                }else{
                    throw new Error("Blog not found")
                }
                

            }

            deleteBlog : (parent , args)=> {
                const blog = blogServer.find(blog => blog.title === args.title)
                if(blog){
                
                    const blog =blogServer.find(blog => blog.title === args.title)
                    if(blog){
                        const index =blogServer.indexOf(comment) 
                        comments.splice(index, 1)
                        return blog
                    }
                }else{
                    throw new Error ("Blog is not found")

                }
            },


                deleteCommentOnBlog: (pareent, args) => {
                    const blog = blogServer.find(blog => blog.title === args.title)
                    if(blog){
                        const comments = blog.comments
                        const comment  = comments.find(comment => comment.message === args.comment)
                        if (comment){
                            const index = comments.indexOf(comment)
                            comments.splice(index, 1)
                            return blog
                        }else{
                            throw new Error("comment not found")
                        }
                    }else{
                        throw new Error("Blog not found")
                    }

                    }
                }

                
                

                }
                 
                      
                  

              

                  const server = new ApolloServer({
                      typeDefs: blogSchema,
                      resolvers: blogResolver,
                      playground: true,
                      introspection: true
                  });


                  Server.listen(8000) .then(({url, port})) => {  
                      console.log('Server ready at $ {url}:${port}')

                }).catch( err => console.log(err));



            }



















         }
     }


































     































