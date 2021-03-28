@extends('admin.app')

@section('content')
 
<div class="row">
    <div class="col-md-12 text-right mb-4">
        <a href="{{ route('admin.video.create') }}" class="btn btn-primary">Create Video</a>
    </div>
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
            <div class="table-responsive">
                @if($videos->isNotEmpty())
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Video</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($videos as $video)
                        <tr>
                            <td>{{$video->id}}</td>
                            <td>{{ $video->name }}</td>
                            <td>{{ $video->video }}</td>
                            <td>
                                <a href="{{ route('admin.video.edit', $video->id) }}">
                                    Edit
                                </a>
                                |
                                <a  href="{{ route('admin.video.destroy', $video->id) }}"
                                    onclick="event.preventDefault();
                                        document.getElementById('destroy-form{{$video->id}}').submit();">
                                    Delete
                                </a>

                                <form id="destroy-form{{$video->id}}" action="{{ route('admin.video.destroy', $video->id) }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                    <input type="hidden" name="_method" value="DELETE" /> 
                                </form>
                            </td>
                        </tr>
                        @endforeach
                      </tbody>
                    </table>
                    @else
                    <p class="text-center">No Videos Added</p>
                    @endif
                  </div>
            </div>
        </div>
    </div>    
</div>
					
@endsection