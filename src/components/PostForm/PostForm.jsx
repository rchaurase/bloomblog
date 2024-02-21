import React,{useCallback} from 'react'
import {useForm} from 'react-hook-form'
import {Button,Input,Select,RTE} from '../index'
import service from '../../appwrite/db_service'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({post}) {
  const {register,handleSubmit,watch,setVAlue,control,getValue}  = useForm({
    defaultValue:{
      title: post?.title||'',
      slug:post?.slug|| '',
      content:post?.content||'',
      status:post?.status||'active',

    }
  })

  const navigate = useNavigate()
  const userData = useSelector(state=>state.auth.userDate)

  const submit = async(data)=>{
    if(post){
      data.featuredImage[0]? service.uploadFile(data.featuredImage[0]) :null
      if(file){
        service.deleteFile(post.featuredImage)
      }
      const dbPost = await service.updatePost(post.$id,{
        ...data,featuredImage:file?file.$id:undefined,

      if(dbPost){
         navigate(`/post/${dbPost.$id}`)
      }
      })
    }else{
      const file = await service.uploadFile(data.featuredImage[0]);
      if(file){
        const fileId = file.$id
        data.featuredImage = fileId
        const dbPost = await service.createPost({
          ...data,
          userId:userData.$id,
        })
        if(dbPost){
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }

  }

  const slugTransform = useCallback((value)=>{
    if(value && typeof value === 'string'){
      return value.trim().toLowerCase().replace(/^[a-zA-Z\d\s]+/g,'-').replace(/\s/g,'-')
    
      return ''
    }
  },[])

  React.useEffect(()=>{
    const subscription = watch((value,{name})=>{
      if(name === 'title'){
        setVAlue('slug',slugTransform(value.title,{shouldValidate :true}))
      }
    })

    return  ()=>{
      subscription.unsubscribe()
    }

  },[watch,slugTransform,setVAlue])

  return (
    <div>
      <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
          <div className='W-2/3 PX-2'>
            <Input
              label="title"
              placeholer='Enter your title'
              {...register('title',{
                required:true
              })}
            />
            <Input
              label="slug"
              placeholer = 'slug'
              className='mb-4'
              {...register('slug',{
                required:true
              })}
              onChange ={(e)=>{
                setVAlue('slug',slugTransform(e.currentTarget.value),{
                  shouldValidate : true
                })
              }}
            />
            <RTE
              label='content:' name='content' control={control} defaultValue={getValue('content')}
            />


          </div>
          <div className='w-1/3 px-2'>
          <Input
            label="Featured image"
            type='file'
            className = 'mb-4'          
            accept = 'image/png,image/jpg,image/jpeg,image/gif'
            {...register ('image',{required:!post}) }
            />
            {post&& (
              <div className='w-full mb-4'>
                <img
                  src={service.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className='mb-4'
                  
                />
              </div>
            )}
            <Select
              options={['active','inactive']}
              label='Status'
              className='mb-4'
              {...register('statys',{required:true})}
            />
            <Button type='submit' bgColor={post? 'bg-green-500' : undefined} className='w-full'>
              {post?"Update":"Submit"}
            </Button>
          </div>
      </form>
    </div>
  )
}

export default PostForm
