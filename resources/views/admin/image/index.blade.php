@extends('admin.app')

@section('content')
 
<div class="row">
    <div class="col-md-12 text-right mb-4">
        <a href="{{ route('admin.image.create') }}" class="btn btn-primary">Create Image</a>
    </div>
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
            <div class="table-responsive">
                @if($images->isNotEmpty())
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($images as $image)
                        <tr>
                            <td>{{$image->id}}</td>
                            <td>{{ $image->name }}</td>
                            <td>{{ $image->image }}</td>
                            <td>
                                <a href="{{ route('admin.image.edit', $image->id) }}">
                                    Edit
                                </a>
                                |
                                <a  href="{{ route('admin.image.destroy', $image->id) }}"
                                    onclick="event.preventDefault();
                                        document.getElementById('destroy-form{{$image->id}}').submit();">
                                    Delete
                                </a>

                                <form id="destroy-form{{$image->id}}" action="{{ route('admin.image.destroy', $image->id) }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                    <input type="hidden" name="_method" value="DELETE" /> 
                                </form>
                            </td>
                        </tr>
                        @endforeach
                      </tbody>
                    </table>
                    @else
                    <p class="text-center">No Image Added</p>
                    @endif
                  </div>
            </div>
        </div>
    </div>    
</div>
					
@endsection